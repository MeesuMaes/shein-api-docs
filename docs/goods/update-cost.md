# 更新成本价

`POST /open-api/goods/update-cost`

**QPS**：20 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v15 ｜ **更新时间**：2026-08-03 11:06:53 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001941](https://open.sheincorp.com/documents/apidoc/detail/3001941)

## 接口说明

该API支持更新商品成本价（也称供货价）信息。

## 请求头

- **language** `string` **必填** — 默认返回中文多语言信息，支持语种：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **skc_info_list** `object[]` **必填** — skc信息。单次最多上传20个skc。
  - **skc_name** `string` **必填** — skc_name，skc_name是商品发布SHEIN生成的系统编码
  - **change_price_reason_flag** `string` **必填** — 涨价原因code。需填写平台提供的枚举值，不可随意输入。 26年7月1日开始字段必填。不同商家可填写的涨价原因不同，需通过接口获取/open-api/goods/query-change-price-reason。 发起涨价前，请先通过接口确认商品能否涨价（商品参与营销活动后可能无法涨价）：/open-api/goods/searchProduct，activityLockList-priceLockType
  - **change_remark** `string` — 涨价原因说明。商家可自定义输入内容，最多1000个字符。
  - **file_upload_list** `object[]` — 涨价原因辅助材料，最多可上传1个材料。
    - **object_key** `string` **必填** — 文件唯一编码。需通过接口转换获得：/open-api/goods/discuss/upload-discuss-file
    - **type** `string` **必填** — 文件类型。1:图片（jpg / jpeg / png） 2:pdf 5:csv 6:excel（xls / xlsx） 必传，如果不传值可能会导致运营端无法正常查看材料，导致审核异常。
    - **url** `string` — 文件地址。需通过接口转换获得：/open-api/goods/discuss/upload-discuss-file
  - **sku_info_list** `object[]` **必填** — sku信息。单次最多上传20个sku。
    - **cost** `double` **必填** — 更新后的成本价（供货价）。 大于0小于100000的数值，最多2位小数点。
    - **currency** `string` **必填** — 币种。需通过商品发布字段规范（含默认语种）获取，字段"currency"
    - **sku_code** `string` **必填** — sku_code，sku_code是商品发布SHEIN生成的系统编码
- **spu_name** `string` **必填** — spu_name，spu_name是商品发布SHEIN生成的系统编码

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — 成功: 0
- **msg** `string` — 响应描述
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/update-cost' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "spu_name": "xS25121523423",
    "skc_info_list": [
        {
            "skc_name": "sf24112312321581",
            "sku_info_list": [
                {
                    "cost": "10.55",
                    "currency": "EUR",
                    "sku_code": "I1231281em4e"
                },
                {
                    "cost": "10.55",
                    "currency": "EUR",
                    "sku_code": "I12312311ew4e"
                },
                {
                    "cost": "10.55",
                    "currency": "EUR",
                    "sku_code": "I122211281ef4e"
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
  "info": null,
  "bbl": null,
  "traceId": "c2222a9c0223234e"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001941。