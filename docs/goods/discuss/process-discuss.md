# 处理议价单

`POST /open-api/goods/discuss/process-discuss`

**QPS**：10 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v5 ｜ **更新时间**：2026-07-02 20:35:43 ｜ **所属权限包**：[议价单管理](/packages/negotiation) ｜ **官方文档**：[3001892](https://open.sheincorp.com/documents/apidoc/detail/3001892)

## 接口说明

只有议价单状态discussStatus=1（待商家确认）的议价单，才可以使用此接口调用处理。
议价单的处理操作有3项。
1、同意平台建议价：同意后，商品价格会变更为平台建议价格，议价单结束。
2、拒绝，放弃上架商品：拒绝后，议价单结束，商家无法再发起报价处理，商品无法上架
3、重新报价：商家对平台建议价有疑问，再次进行价格沟通。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **language** `string` **必填** — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **confirmInfos** `object[]` — 议价单操作=【同意平台建议价】或【拒绝，放弃上架】时，请在此字段内入参。 注意：每个议价单只能执行一个操作，不要同时在confirmInfos、createCostDiscusses中入参执行多项操作。
  - **discussAuditType** `string` **必填** — 操作类型 1-同意平台建议价； 2-拒绝，放弃上架 例: `random_discussAuditType`
  - **discussSn** `string` **必填** — 议价单号 只有议价单状态discussStatus=1（待商家确认）的议价单，才可以使用此接口调用处理。 例: `random_discussSn`
- **createCostDiscusses** `object[]` — 议价单操作=【重新报价】时，请在此字段内入参。 注意：每个议价单只能执行一个操作，不要同时在confirmInfos、createCostDiscusses中入参执行多项操作。
  - **discussSn** `string` **必填** — 议价单号。 只有议价单状态discussStatus=1（待商家确认）的议价单，才可以使用此接口调用处理。 例: `random_discussSn`
  - **discussStep** `integer` **必填** — 议价单轮次数。每个议价单可沟通价格的次数有限，若次数=0则代表无法再次发起新报价。 取值逻辑=获取议价单列表接口：/open-api/goods/discuss/query-discuss-list的serialNumber 例: `77`
  - **fileUploadList** `object[]` — 上传议价材料
    - **file_name** `string` — 原始文件名（开发者维护） 例: `random_file_name`
    - **object_key** `string` — 文件key，由平台生成，通过接口上传文件后获取/open-api/goods/discuss/upload-discuss-file 例: `random_object_key`
    - **type** `integer` — 文件类型。仅支持1:图片 例: `23`
    - **url** `string` — 文件url，由平台生成，通过接口上传文件后获取/open-api/goods/discuss/upload-discuss-file 例: `random_url`
  - **reason** `string` — 商家填写发起议价的理由，最多255个字符 例: `random_reason`
  - **skcName** `string` **必填** — 平台的skc编码 例: `random_skcName`
  - **skuCostInfoList** `object[]` **必填** — 发起议价的sku成本价列表
    - **cost** `double` **必填** — 成本价 例: `31.99`
    - **currency** `string` **必填** — 币种 例: `random_currency`
    - **lastCost** `double` **必填** — 上次报价的成本价。 取值逻辑=获取议价单列表接口：/open-api/goods/discuss/query-discuss-list的响应中"costPriceHistories"下"serialNumber"数值最大组的costPrice（即议价历史记录中，最新一次议价时的价格。注意：从未发起过议价的sku也有议价历史，会用发布商品时的价格作为第一次议价历史。） 例: `51.72`
    - **lastCurrency** `string` **必填** — 上次报价的币种。 取值逻辑=获取议价单列表接口：/open-api/goods/discuss/query-discuss-list的响应中"costPriceHistories"下"serialNumber"数值最大组的currency 例: `random_lastCurrency`
    - **skuCode** `string` **必填** — 平台的sku编码 例: `random_skuCode`

## 响应参数

- **code** `string` **必填** — 响应码 例: `11523`
- **info** `object` — 响应详情
  - **failCount** `integer` — 提交失败数 例: `23356`
  - **successCount** `integer` — 提交成功数 例: `13695`
- **msg** `string` — 响应信息 例: `adipisci quasi odit voluptatem enim dolor porro hic mollitia impedit aut sunt es`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods/discuss/process-discuss' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1762495278098' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "createCostDiscusses": [
    {
      "discussSn": "YJ30251107172948307968",
      "discussStep": 2,
      "fileUploadList": [
        {
          "file_name": "test_file_name",
          "object_key": "rdpas251107-4299811744231955199.jpeg",
          "type": 1,
          "url": "https://fsproxy-test.ltwebstatic.com/dpas-test/dpas251107-4299811744231955199.jpeg?Expires=1762505860&Signature=<REDACTED>&AccessKeyId=<REDACTED>"
        }
      ],
      "reason": "test reason",
      "skcName": "ss25012285492844",
      "skuCostInfoList": [
        {
          "cost": 400.00,
          "currency": "EUR",
          "lastCost": 480,
          "lastCurrency": "EUR",
          "skuCode": "I4ajkf1r3xrs"
        }
      ]
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
    "successCount": 1,
    "failCount": 0
  },
  "bbl": null,
  "traceId": "c6b789192a4e8eec"
}
```

&lt;/details>

## 其他场景示例

### 同意/拒绝操作

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "successCount": 1,
    "failCount": 0
  },
  "bbl": null,
  "traceId": "e2258b5b91bdab5"
}
```

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001892。