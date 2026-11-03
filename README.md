# SHEIN 开放平台 API 文档

SHEIN 开放平台 Open API 文档镜像，基于 Rspress 构建。数据由脚本从官方文档实时抓取，不手工维护。

站点：https://meesumaes.github.io/shein-api-docs/

## 数据来源

官方文档详情页是 SPA，正文不在 HTML 里。脚本直接调用其后端接口：

```
GET https://open.sheincorp.com/api/api/apiDoc/queryApiPublishDocDetailInfoById?id=<docSearchId>&isLatest=true
```

拿到的结构化参数树（字段名、类型、必填、示例值、嵌套子字段）再渲染成 Markdown，因此参数层级和必填标记与官方一致，而不是从页面文本里猜。

接口清单来自 `source/SHEIN开放平台.md`，即某个已订阅权限包的应用详情页导出。

## 目录结构与生成

- `source/`：原始权限包清单（应用详情页导出的表格）。
- `templates/`：手写页面模板（快速接入）。
- `scripts/fetch-shein-docs.cjs`：抓取全部接口，生成 `docs/` 下的接口页、权限包页、总览页，并重写 `sidebar.json`。
- `docs/`：Rspress 的 root，全部由脚本生成，不要手改。

```bash
npm install
npm run fetch     # 抓取并重新生成 docs/ 与 sidebar.json
npm run dev       # 本地预览
npm run build     # 构建到 doc_build/
```

已接入 `@rspress/plugin-llms`，构建产物含 `llms.txt`、`llms-full.txt`，便于把整站喂给 AI。

推送到 main 后由 GitHub Actions 自动发布到 GitHub Pages。

## 页面组织

- 接口页路径取自官方 `openPath`（去掉 `/open-api` 前缀），例如 `/open-api/goods/discuss/query-discuss-list` → `/goods/discuss/query-discuss-list`，便于与官方路径对照。
- 侧边栏按权限包分组，接口按中文名排序，带方法徽标。
- 一个接口归属多个权限包时，页面只存一份，按首个权限包归类；其余包页标注为共享权限。

## 已知边界

- 官方示例里夹带的云存储预签名 URL（腾讯云 COS / AWS S3）含真实凭证格式的 AccessKey，抓取时会替换为 `<REDACTED>`，只保留域名与路径。
- 签名算法官方只在接口文档里写「接口签名」，完整拼接规则见平台《授权手册》，本仓库不臆测。
- 官方文档中的示例值多为占位数据（随机字符串、随机数字），字段含义以说明文字为准。
- 接口下线或权限包变更后需重跑 `npm run fetch`，脚本会全量重建 `docs/`，不会残留僵尸页面。
