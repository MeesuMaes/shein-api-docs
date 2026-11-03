#!/usr/bin/env node
"use strict";

/**
 * 抓取 SHEIN 开放平台 API 文档，直接生成 Rspress 站点页面与 sidebar.json。
 *
 * 数据源：open.sheincorp.com 后端 JSON 接口
 *   GET /api/api/apiDoc/queryApiPublishDocDetailInfoById?id=<docSearchId>&isLatest=true
 * 与 shein-open-docs skill 的 fetch_doc.js 同源，比抓 SPA 页面可靠。
 *
 * 用法：node scripts/fetch-shein-docs.js [--lang CN|US] [--with-orphans] [--limit N]
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const ROOT = path.dirname(__dirname);
const SOURCE_MD = path.join(ROOT, "source", "SHEIN开放平台.md");
const DOCS = path.join(ROOT, "docs");
const TEMPLATES = path.join(ROOT, "templates");
const LANG = (process.argv.includes("--lang") ? process.argv[process.argv.indexOf("--lang") + 1] : "CN").toUpperCase();
const CONCURRENCY = 5;
const RETRY = 2;

/** 权限包中文名 → URL 段。未列出的走 sanitize 兜底并打警告。 */
const PACKAGE_SLUG = {
  "议价单管理": "negotiation",
  "商品视频": "product-video",
  "营销活动报名": "campaign",
  "店铺信息查询": "shop-info",
  "开发者接入": "developer-access",
  "商家服务-商品": "merchant-goods",
  "商品管理": "goods",
  "上传商品证书": "product-certificate",
  "商品合规资质": "compliance",
  "采购单履约": "purchase-fulfillment",
  "采购单退货解决方案": "purchase-return",
  "备货申请": "stock-request",
  "库存同步": "inventory-sync",
  "销量查询": "sales-query",
  "账单接口（全托&POP）": "finance",
  "获取定制信息": "customization",
};

const METHODS = {
  GET: { bg: "#ecfdf5", fg: "#10b981" },
  POST: { bg: "#fff1e6", fg: "#f97316" },
  PUT: { bg: "#eff6ff", fg: "#3b82f6" },
  DELETE: { bg: "#fef2f2", fg: "#ef4444" },
};

function methodTag(method) {
  const m = String(method || "POST").toUpperCase();
  const c = METHODS[m] || METHODS.POST;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="16"><rect width="40" height="16" rx="4" fill="${c.bg}"/>` +
    `<text x="20" y="12" font-size="9" font-weight="700" font-family="sans-serif" text-anchor="middle" fill="${c.fg}">${m}</text></svg>`
  );
}

function requestJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: "GET",
        timeout: 20000,
        headers: {
          accept: "*/*",
          "accept-language": LANG,
          "content-type": "application/json",
          cookie: "NEXT_LOCALE=" + (LANG === "CN" ? "zh" : "en"),
          referer: "https://open.sheincorp.com/search",
        },
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode < 200 || res.statusCode >= 300) return reject(new Error("HTTP " + res.statusCode));
          try {
            const json = JSON.parse(data);
            if (json.code !== "0") return reject(new Error("code=" + json.code + " msg=" + json.msg));
            resolve(json.info);
          } catch (e) {
            reject(new Error("parse: " + e.message));
          }
        });
      }
    );
    request.on("timeout", () => request.destroy(new Error("timeout")));
    request.on("error", reject);
    request.end();
  });
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function htmlToText(html) {
  if (!html) return "";
  return decodeEntities(
    String(html)
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
      .replace(/<\/(p|div|li|tr|h\d)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<li[^>]*>/gi, "- ")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");
}

function inlineText(html) {
  return htmlToText(html).replace(/\n+/g, " ").replace(/\|/g, "\\|").trim();
}

/**
 * MDX 安全：正文里的 { } < 会被当成表达式/JSX 解析，需转义；代码块与行内代码例外。
 */
function esc(text) {
  const out = [];
  let inCode = false;
  for (const line of text.split("\n")) {
    if (line.trimStart().startsWith("```")) inCode = !inCode;
    if (inCode) {
      out.push(line);
      continue;
    }
    out.push(
      line
        .split(/(`[^`]*`)/)
        .map((seg) =>
          seg.startsWith("`") ? seg : seg.replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/</g, "&lt;")
        )
        .join("")
    );
  }
  return out.join("\n");
}

/** openPath → 站点路径（去掉 /open-api 前缀，小写，保持层级） */
function slugFromPath(p) {
  return String(p || "")
    .replace(/^\/open-api\//, "")
    .replace(/^\//, "")
    .toLowerCase()
    .replace(/[^a-z0-9\-_\/]/g, "-")
    .replace(/-+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^[-/]+|[-/]+$/g, "");
}

/**
 * 官方文档的响应示例里夹带了对象存储的预签名 URL（腾讯云 COS / AWS S3），
 * 其中的 AccessKey 与签名参数属于真实凭证格式，公开仓库不能留。
 * 这里保留可读的域名与路径，脱掉 query 里的凭证部分。
 */
function redactSecrets(text) {
  return String(text)
    .replace(/\b(AKID)[A-Za-z0-9]{10,}/g, "$1<REDACTED>")
    .replace(/\b(AKIA)[0-9A-Z]{12,}/g, "$1<REDACTED>")
    .replace(/\b(ASIA)[0-9A-Z]{12,}/g, "$1<REDACTED>")
    .replace(/([?&](?:X-Amz-Credential|X-Amz-Signature|X-Amz-Security-Token)=)[^&"'\s]+/gi, "$1<REDACTED>")
    .replace(/([?&](?:q-signature|q-ak|SecretId|AccessKeyId|Signature)=)[^&"'\s]+/gi, "$1<REDACTED>");
}

function renderTree(node, depth, lines) {
  if (!node || !Array.isArray(node.children)) return;
  for (const child of node.children) {
    const p = child.props || {};
    const name = p.name || "(未命名)";
    let type = p.type || "any";
    if (p.multiple) type += "[]";
    const indent = "  ".repeat(depth);
    const required = p.required ? " **必填**" : "";
    const example =
      p.example !== undefined && p.example !== "" && p.example !== null
        ? " 例: `" + String(p.example).replace(/`/g, "'").slice(0, 80) + "`"
        : "";
    const desc = inlineText(p.description);
    lines.push(`${indent}- **${name}** \`${type}\`${required}${desc ? " — " + desc : ""}${example}`);
    if (child.children && child.children.length) renderTree(child, depth + 1, lines);
  }
}

function parseSource(md) {
  const apis = new Map();
  const orphanPaths = [];
  const packageOrder = [];
  let pkg = null;
  for (const line of md.split("\n")) {
    if (!line.startsWith("|")) continue;
    const cells = line.split("|").slice(1, -1).map((s) => s.trim());
    if (cells.length < 4) continue;
    if (cells[0] === "权限包" || /^-+$/.test(cells[0])) continue;
    if (cells[0]) {
      pkg = cells[0];
      if (!packageOrder.includes(pkg)) packageOrder.push(pkg);
    }
    const cell = cells[3];
    if (!cell) continue;
    const m = cell.match(/\[([^\]]+)\]\((https:\/\/open\.sheincorp\.com\/documents\/apidoc\/detail\/(\d+))\)/);
    if (m) {
      const id = m[3];
      if (!apis.has(id)) apis.set(id, { id, name: cells[2] || m[1], pkgs: [] });
      const rec = apis.get(id);
      if (pkg && !rec.pkgs.includes(pkg)) rec.pkgs.push(pkg);
    } else {
      orphanPaths.push({ pkg, path: cell.replace(/\\/g, "") });
    }
  }
  return { apis, orphanPaths, packageOrder };
}

function safeName(s) {
  return String(s).replace(/[\/\\:*?"<>|\n]/g, "-").replace(/\s+/g, " ").trim().slice(0, 80);
}

function apiPage(api, info) {
  const vo = info.apiPublishDocVo || {};
  const d = info.apiPublishDocDetailVo || {};
  const modes = (info.modeNameList || []).join(" / ");
  const slug = slugFromPath(vo.openPath);
  const out = [];

  out.push(`# ${vo.userDocName || vo.title || api.name}`);
  out.push("");
  out.push(`\`${vo.method || ""} ${vo.openPath || ""}\``);
  out.push("");

  const meta = [];
  if (vo.qpsContent) meta.push(`**QPS**：${vo.qpsContent}`);
  if (modes) meta.push(`**合作模式**：${modes}`);
  if (vo.version) meta.push(`**文档版本**：v${vo.version}`);
  if (vo.updateTime) meta.push(`**更新时间**：${vo.updateTime}`);
  if (api.pkgs.length) {
    meta.push(`**所属权限包**：${api.pkgs.map((p) => `[${p}](/packages/${PACKAGE_SLUG[p] || "misc"})`).join("、")}`);
  }
  meta.push(`**官方文档**：[${api.id}](https://open.sheincorp.com/documents/apidoc/detail/${api.id})`);
  out.push(meta.join(" ｜ "));
  out.push("");

  const desc = htmlToText(d.description);
  if (desc) {
    out.push("## 接口说明");
    out.push("");
    out.push(desc);
    out.push("");
  }

  const sections = [
    ["请求头", d.requestHeader],
    ["请求参数", d.requestBody],
    ["响应参数", d.responseBody],
  ];
  for (const [title, raw] of sections) {
    if (!raw) continue;
    let tree;
    try {
      tree = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch {
      continue;
    }
    const lines = [];
    renderTree(tree, 0, lines);
    if (!lines.length) continue;
    out.push(`## ${title}`);
    out.push("");
    out.push(...lines);
    out.push("");
  }

  const examples = d.apiPublishDocExampleDetailVo || [];
  let reqEx = d.requestExample || "";
  let resEx = d.responseExample || "";
  if (!reqEx && examples[0]) reqEx = examples[0].requestExample || "";
  if (!resEx && examples[0]) resEx = examples[0].responseExample || "";

  const stripTags = (s) =>
    decodeEntities(String(s || "").replace(/<\/?(pre|code|p|br|span|div)[^>]*>/gi, "")).trim();

  const pushBlock = (title, raw) => {
    const text = stripTags(raw);
    if (!text) return;
    let body = text;
    let lang = "bash";
    const t = text.trim();
    if (t.startsWith("{") || t.startsWith("[")) {
      try {
        body = JSON.stringify(JSON.parse(t), null, 2);
        lang = "json";
      } catch {
        lang = "text";
      }
    }
    if (title) {
      out.push(title);
      out.push("");
    }
    out.push("```" + lang);
    out.push(body);
    out.push("```");
    out.push("");
  };

  out.push("<details>");
  out.push("<summary>请求与响应示例</summary>");
  out.push("");
  pushBlock("### 请求示例", reqEx);
  pushBlock("### 响应示例", resEx);
  out.push("</details>");
  out.push("");

  if (examples.length > 1) {
    out.push("## 其他场景示例");
    out.push("");
    for (const ex of examples.slice(1)) {
      out.push(`### ${ex.sceneName || "场景"}`);
      out.push("");
      pushBlock("", ex.responseExample || ex.requestExample || "");
    }
  }

  out.push("---");
  out.push("");
  out.push(`本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 ${vo.id || api.id}。`);
  return { slug, content: esc(out.join("\n")) };
}

async function fetchOne(api) {
  let lastErr;
  for (let i = 0; i <= RETRY; i++) {
    try {
      return await requestJson(
        "https://open.sheincorp.com/api/api/apiDoc/queryApiPublishDocDetailInfoById?id=" + api.id + "&isLatest=true"
      );
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw lastErr;
}

const ORPHAN_IDS = [
  { id: "3001186", name: "批量打印环保标", pkgs: ["商家服务-商品"] },
  { id: "3001185", name: "获取环保标配置规则", pkgs: ["商家服务-商品"] },
  { id: "3001184", name: "获取全量耗材类型和耗材材质信息", pkgs: ["商家服务-商品"] },
  { id: "3000833", name: "查询证书所需上传资料", pkgs: ["上传商品证书"] },
];

function writeFile(rel, content) {
  const p = path.join(DOCS, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, redactSecrets(content), "utf8");
}

async function main() {
  const md = fs.readFileSync(SOURCE_MD, "utf8");
  const { apis, orphanPaths, packageOrder } = parseSource(md);

  if (process.argv.includes("--with-orphans")) {
    for (const o of ORPHAN_IDS) if (!apis.has(o.id)) apis.set(o.id, { ...o, pkgs: [...o.pkgs] });
    for (const p of ["商家服务-商品", "上传商品证书"]) if (!packageOrder.includes(p)) packageOrder.push(p);
  }

  let list = [...apis.values()];
  if (process.argv.includes("--limit")) {
    list = list.slice(0, Number(process.argv[process.argv.indexOf("--limit") + 1]) || 3);
  }

  console.log(`抓取 ${list.length} 个 API 文档（lang=${LANG}），并发 ${CONCURRENCY}`);

  // 全量重建 docs，避免下线接口的僵尸页面残留
  fs.rmSync(DOCS, { recursive: true, force: true });
  fs.mkdirSync(DOCS, { recursive: true });

  const quickStart = path.join(TEMPLATES, "quick-start.md");
  if (fs.existsSync(quickStart)) {
    writeFile("quick-start.md", fs.readFileSync(quickStart, "utf8"));
  }

  const results = [];
  let cursor = 0;
  let done = 0;

  async function worker() {
    while (cursor < list.length) {
      const api = list[cursor++];
      try {
        const info = await fetchOne(api);
        const { slug, content } = apiPage(api, info);
        if (!slug) throw new Error("openPath 为空");
        writeFile(slug + ".md", content);
        results.push({
          ok: true,
          api,
          slug,
          name: (info.apiPublishDocVo || {}).userDocName || api.name,
          method: (info.apiPublishDocVo || {}).method || "",
          openPath: (info.apiPublishDocVo || {}).openPath || "",
          version: (info.apiPublishDocVo || {}).version || "",
          updateTime: (info.apiPublishDocVo || {}).updateTime || "",
        });
      } catch (e) {
        results.push({ ok: false, api, error: e.message });
      }
      done++;
      if (done % 20 === 0 || done === list.length) process.stdout.write(`  ${done}/${list.length}\n`);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const ok = results.filter((r) => r.ok);
  const fail = results.filter((r) => !r.ok);

  // 同一 openPath 小写化后撞车会被后写覆盖，这里兜底提示
  const slugCount = new Map();
  for (const r of ok) slugCount.set(r.slug, (slugCount.get(r.slug) || 0) + 1);
  const dupes = [...slugCount.entries()].filter(([, n]) => n > 1);

  const byPkg = new Map();
  for (const r of ok) {
    const pkg = r.api.pkgs[0] || "未分类";
    if (!byPkg.has(pkg)) byPkg.set(pkg, []);
    byPkg.get(pkg).push(r);
  }
  for (const items of byPkg.values()) items.sort((a, b) => a.name.localeCompare(b.name, "zh"));

  const sidebar = [
    { text: "快速接入", link: "/quick-start" },
    { text: "接口总览", link: "/" },
  ];
  for (const pkg of packageOrder) {
    const items = byPkg.get(pkg);
    if (!items || !items.length) continue;
    sidebar.push({
      text: pkg,
      link: `/packages/${PACKAGE_SLUG[pkg] || "misc"}`,
      collapsed: true,
      items: items.map((r) => ({ text: r.name, link: "/" + r.slug, tag: methodTag(r.method) })),
    });
  }
  fs.writeFileSync(path.join(ROOT, "sidebar.json"), JSON.stringify(sidebar, null, 2) + "\n", "utf8");

  // 权限包页：列出所有声明归属该包的接口（含跨包共享的），避免出现只有链接没有页面的死链
  const pkgRows = [];
  for (const pkg of packageOrder) {
    const mine = ok.filter((r) => r.api.pkgs.includes(pkg)).sort((a, b) => a.name.localeCompare(b.name, "zh"));
    const slug = PACKAGE_SLUG[pkg] || "misc";
    pkgRows.push([pkg, slug, mine.length]);

    const lines = [`# ${pkg}`, "", `共 ${mine.length} 个接口。`, ""];
    lines.push("| 接口 | 方法 | 路径 | 更新 |");
    lines.push("| --- | --- | --- | --- |");
    for (const r of mine) {
      const shared = r.api.pkgs.length > 1 && r.api.pkgs[0] !== pkg ? " ※" : "";
      lines.push(
        `| [${r.name}${shared}](/${r.slug}) | \`${r.method}\` | \`${r.openPath}\` | ${r.updateTime || "-"} |`
      );
    }
    lines.push("");
    if (mine.some((r) => r.api.pkgs[0] !== pkg)) {
      lines.push("※ 该接口主归属在其他权限包，此处为共享权限。");
      lines.push("");
    }
    writeFile(`packages/${slug}.md`, esc(lines.join("\n")));
  }

  // 总览页
  const idx = [];
  idx.push("# SHEIN 开放平台 API 文档");
  idx.push("");
  idx.push(
    `收录 **${ok.length}** 个 Open API 接口，分属 **${pkgRows.length}** 个权限包。数据抓取自 SHEIN 开放平台官方文档，随官方更新重新生成。`
  );
  idx.push("");
  idx.push("## 使用说明");
  idx.push("");
  idx.push("- 所有接口共用同一套请求头与签名机制，先看[快速接入](/quick-start)。");
  idx.push("- 每个接口页包含：请求头、请求参数树（含必填标记与示例值）、响应参数树、请求/响应示例。");
  idx.push("- 页面里的示例值多为官方占位数据，字段含义以“说明”列为准。");
  idx.push("");
  idx.push("## 权限包");
  idx.push("");
  idx.push("| 权限包 | 接口数 | 说明 |");
  idx.push("| --- | --- | --- |");
  for (const [pkg, slug, n] of pkgRows) idx.push(`| [${pkg}](/packages/${slug}) | ${n} | — |`);
  idx.push("");

  const crossPkg = ok.filter((r) => r.api.pkgs.length > 1);
  if (crossPkg.length) {
    idx.push("## 跨权限包接口");
    idx.push("");
    idx.push(`${crossPkg.length} 个接口同时归属多个权限包，页面只收录一份，按首个权限包归类。`);
    idx.push("");
    for (const r of crossPkg) {
      idx.push(`- [${r.name}](/${r.slug}) — ${r.api.pkgs.join("、")}`);
    }
    idx.push("");
  }

  if (fail.length) {
    idx.push("## 抓取失败");
    idx.push("");
    for (const r of fail) idx.push(`- ${r.api.name}（${r.api.id}）：${r.error}`);
    idx.push("");
  }

  const recovered = new Set(ORPHAN_IDS.map((o) => o.id));
  const remainingOrphans = orphanPaths.filter((o) => !/[0-9]{7}/.test(o.path) && !recovered.has(o.path));
  const wildcard = orphanPaths.filter((o) => o.path.includes("**"));
  if (wildcard.length) {
    idx.push("## 无独立文档的路径");
    idx.push("");
    idx.push("源权限表中以下路径为通配写法，官方没有对应文档页：");
    idx.push("");
    for (const o of wildcard) idx.push(`- \`${o.path}\`（权限包：${o.pkg || "-"}）`);
    idx.push("");
  }

  writeFile("index.md", esc(idx.join("\n")));

  console.log(`完成：成功 ${ok.length}，失败 ${fail.length}，权限包 ${pkgRows.length}`);
  if (dupes.length) console.log("路径冲突:", dupes.map(([s, n]) => `${s}×${n}`).join(", "));
  if (fail.length) fail.slice(0, 10).forEach((f) => console.log("  失败:", f.api.name, f.api.id, f.error));
}

void main();
