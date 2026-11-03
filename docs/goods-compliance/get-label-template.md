# 查询SKC可用的标签模板

`POST /open-api/goods-compliance/get-label-template`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v2 ｜ **更新时间**：2025-08-19 11:08:12 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001373](https://open.sheincorp.com/documents/apidoc/detail/3001373)

## 接口说明

平台基于各国家地区的要求，提前预设了多个标签模板，例如GPSR标签模板。系统会为每个skc推荐可用的标签模板，建议商家使用平台的标签模板打印。点击此处查看商家后台的打印流程。
此接口可查到每个skc的可用标签模板详细信息（包括预览图），商家可查看预览图后确认要使用的模板后，基于模板进行标签打印：/open-api/goods-compliance/label-print

## 请求头

- **x-lt-signature** `string` — 查看签名生成规则
- **x-lt-openKeyId** `string` — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400
- **Content-Type** `string` — application/json
- **language** `string` — 指定出参语种，默认中文；支持语种:英语:EN 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **skc** `string` **必填** — 平台生成的skc编码

## 响应参数

- **code** `string` **必填** — 响应码。正常为“0” 例: `0`
- **msg** `string` **必填** — 响应信息。正常为“OK” 例: `OK`
- **info** `object` **必填** — 详情
  - **skc** `string` **必填** — 入参的skc 例: `sa25080185896920018`
  - **labelList** `object[]` — 可用标签模板列表
    - **labelCode** `string` — 标签模板code 例: `1754474187729`
    - **labelName** `string` — 标签模板名称 例: `开平专用-商品条码`
    - **labelType** `integer` — 标签类型 例: `5`
    - **labelPreview** `string` — 模板预览图。包含了标签的样式结构以及标签内涉及的变量信息。 例: `https://pdf-test01.dotfashion.cn/pdf-proxy/pdf2-test/grc-test01.sheincorp.cn/202`
- **traceId** `string` **必填** — 请求追踪码。 例: `e8a87caa89888d32`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://https://openapi.sheincorp.com/open-api/goods-compliance/get-label-template' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1755506960113' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--header 'Connection: keep-alive' \
--data-raw '{
    "skc":"sa25080185896920018"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "skc": "sr250811558984fdsf915",
    "labelList": [
      {
        "labelCode": "1754296911182",
        "labelName": "合并打印：条形码/GPSR/环保标",
        "labelType": 2,
        "labelPreview": "https://pdf.dotfashion.cn/pdf-proxy/pdf2/grc.biz.sheincorp.cn/2025/8/5/1754365094106-253ceb2da73950744fdcaeaa5d2e3987.oss.png"
      },
      {
        "labelCode": "1754295909468",
        "labelName": "合并打印：条形码和GPSR标签",
        "labelType": 2,
        "labelPreview": "https://pdf.dotfashion.cn/pdf-proxy/pdf2/grc.biz.sheincorp.cn/2025/8/5/1754373567623-105b09531ca6c4a1c18670183a4b4c3b.oss.png"
      },
      {
        "labelCode": "Fr-EEE (Big）",
        "labelName": "电子电器包装标签模板（贴在包装上）",
        "labelType": 4,
        "labelPreview": "https://pdf.dotfashion.cn/pdf-proxy/pdf2/grc.biz.sheincorp.cn/2025/4/14/1744613327119-6c5927897406ee147bb5a170f7d1c30e.oss.png"
      },
      {
        "labelCode": "GPSR_Huanbaobiao",
        "labelName": "普货_欧盟GPSR+环保标100*100",
        "labelType": 2,
        "labelPreview": "https://pdf.dotfashion.cn/pdf-proxy/pdf2/grc.biz.sheincorp.cn/2025/4/15/1744682895438-afa95a6ef6f8a175629bafef9f89e773.oss.png"
      },
      {
        "labelCode": "666",
        "labelName": "电子电器本体标签模板（贴在本体上）",
        "labelType": 4,
        "labelPreview": "https://pdf.dotfashion.cn/pdf-proxy/pdf2/grc.biz.sheincorp.cn/2025/4/14/1744611905915-9146f66800464c6f9b406b4904d14fc6.oss.png"
      }
    ]
  },
  "bbl": null,
  "traceId": "1f30b3e61cf81e07"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001373。