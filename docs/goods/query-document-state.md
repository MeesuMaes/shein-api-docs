# 查询商品审核状态

`POST /open-api/goods/query-document-state`

**QPS**：70 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v19 ｜ **更新时间**：2026-11-03 10:21:32 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001368](https://open.sheincorp.com/documents/apidoc/detail/3001368)

## 接口说明

支持通过spu查询skc的审核状态，支持查询spu指定版本的审核状态；同时，平台也支持webhook消息通知的方式推送商品审核结果，具体可查看商品公文审核通知

## 请求头

- **language** `string` — 支持返回的多语言报错信息，可用的语种：简体中文：zh-cn、英语：en、西班牙语：es、法语：fr、德语：de、意大利语：it、巴西葡萄牙语：pt-BR、葡萄牙葡萄牙语：pt-PT、波兰语：pl、土耳其语：tr、阿拉伯语：ar、韩语：ko、日语：ja、瑞典语：sv
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **spuList** `object[]` **必填** — spu列表，1次最多传10个spu
  - **spuName** `string` **必填** — spuName，spuName是SHEIN生成的系统编码
  - **version** `string` — 审核版本号。当商品发布或编辑提交后，响应中会包含version。

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **data** `object[]` — 结果
    - **skcList** `object[]` — skc集合
      - **documentSn** `string` — 公文号
      - **documentState** `integer` — 公文状态。-1：接受失败 1：待审核 2：审批成功 3：审批失败 4：已撤回 5：申诉中
      - **failedReason** `object[]` — 审批失败的原因
        - **content** `string` — 内容
        - **language** `string` — 语种
      - **skcName** `string` — skcName，skcNname是SHEIN生成的系统编码
    - **spuName** `string` — spuName，spuName是SHEIN生成的系统编码
    - **version** `string` — 审核版本号
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/query-document-state' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752724239028' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "spuList": [
        {
            "spuName": "MM2404076986",
            "version": "SPMP240407262081729"
        }
    ]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "data": [
      {
        "spuName": "MM2404076986",
        "version": "SPMP240407262081729",
        "skcList": [
          {
            "skcName": "sMM24040769866671",
            "documentSn": "SPMPA320240407000135",
            "documentState": 3,
            "failedReason": [
              {
                "language": "zh-cn",
                "content": "禁忌:frankie test12;1111111"
              },
              {
                "language": "zh-cn",
                "content": "上新管控:测试上新管控驳回·1;1111111"
              }
            ]
          }
        ]
      }
    ],
    "meta": {
      "count": 1,
      "customObj": null
    }
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002088。