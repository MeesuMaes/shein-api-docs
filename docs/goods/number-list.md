# 商品接口-全量查询SKC/SKU/设计款号关系列表

`GET /open-api/goods/number-list`

**QPS**：120 ｜ **合作模式**：全托管 / SHEIN自营 ｜ **文档版本**：v11 ｜ **更新时间**：2025-12-18 10:32:02 ｜ **所属权限包**：[商家服务-商品](/packages/merchant-goods) ｜ **官方文档**：[3001486](https://open.sheincorp.com/documents/apidoc/detail/3001486)

## 接口说明

该API支持查询skc/设计款号等编码信息

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 响应参数

- **code** `integer` — code=0成功，code =1失败 例: `0`
- **msg** `string` — 响应信息 例: `接口请求成功`
- **info** `object` **必填**
  - **page** `integer` — 当前页码 例: `1`
  - **per_page** `integer` — 当前每页数据量 例: `50`
  - **count** `integer` — 总数据量 例: `3`
  - **list** `object[]` **必填**
    - **skc** `string` — design_code查询时,skc为空；skc即skc_Name，skc_Name是商品发布SHEIN生成的系统编码 例: `night171027151`
    - **sku_code** `string` — sku_code，sku_code是商品发布SHEIN生成的系统编码 例: `XXL`
    - **supplier_sku** `string` — 商家sku 例: `night171027151`
    - **design_code** `string` — 设计款号。skc查询时，设计款号为空
    - **attribute** `string` — 属性值
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/number-list?page=1&per_page=100&type=1' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw ''
```

### 响应示例

```text
{
    "code": "0",
    "msg": "OK",
    "info": {
        "page": 1,
        "per_page": 100,
        "count": 1960,
        "list": [
            {
                "skc": "ss23111525874412",
                "supplier_sku": "",
                "design_code": "",
                "sku_code": "I3eu5zp1payu",
                "attribute": "XL-3"
            },
            {
                "skc": "ss23111525874412",
                "supplier_sku": "",
                "design_code": "",
                "sku_code": "I3eu5zp1puhu",
                "attribute": "XL-2pc"
            },
            {
                "skc": "ss23111525874412",
                "supplier_sku": "",
                "design_code": "",
                "sku_code": "I3eu5zp1qbm2",
                "attribute": "XL-4pcs"
            },
            {
                "skc": "ss23111525874412",
                "supplier_sku": "",
                "design_code": "",
                "sku_code": "I3eu5zp1qvhh",
                "attribute": "XL-ww"
            },
            {
                "skc": "ss23111594783030",
                "supplier_sku": "",
                "design_code": "",
                "sku_code": "I14ly1k1jfj7",
                "attribute": "XL-qqqqw"
            },
            {
                "skc": "ss23111594783030",
                "supplier_sku": "",
                "design_code": "",
                "sku_code": "I3eu4ni3200b",
                "attribute": "XL-ww"
            },
            {
                "skc": "ss23111594783030",
                "supplier_sku": "",
                "design_code": "",
                "sku_code": "I3eu4ni32ffa",
                "attribute": "XL-3"
            },
            {
                "skc": "ss23111594783030",
                "supplier_sku": "",
                "design_code": "",
                "sku_code": "I3eu4ni32uep",
                "attribute": "XL-2pc"
            },
            {
                "skc": "ss23111594783030",
                "supplier_sku": "",
                "design
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001486。