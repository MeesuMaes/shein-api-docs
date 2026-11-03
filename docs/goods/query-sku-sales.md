# 根据SKU查询销量

`POST /open-api/goods/query-sku-sales`

**合作模式**：全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v10 ｜ **更新时间**：2025-07-21 11:33:00 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment)、[销量查询](/packages/sales-query) ｜ **官方文档**：[3001305](https://open.sheincorp.com/documents/apidoc/detail/3001305)

## 接口说明

商家可以通过该接口查询7天和30天销量
平台限制的QPS为 40/S，某一时间点大批量的调用接口可能会导致限流
接口的数据为每天北京时间0点统计更新，建议开发者在北京时间的凌晨2点到7点均匀的拉取数据

## 请求头

- **Content-Type** `string` **必填** — application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **skuCodeList** `string[]` **必填** — skuCode，最多上传100个skuCode

## 响应参数

- **bbl** `object` — 响应异常时的bbl相关信息
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **dataList** `object[]` **必填** — sku销量集合
    - **c30dSaleCnt** `integer` **必填** — 30日销量
    - **c7dSaleCnt** `integer` **必填** — 7日销量
    - **cydSaleCnt** `integer` **必填** — 昨日销量
    - **dt** `string` **必填** — 数据统计的截止时间，7天和30天销量根据该时间为起始天数进行7天和30天的销量统计；yyyyMMdd
    - **skuCode** `string` **必填** — sku编码
    - **realTimeSaleCnt** `integer` **必填** — 当日销量
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/query-sku-sales' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570849017' \
--data-raw '{
"skuCodeList":["I6il0w9szgmx"]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "dataList": [
      {
        "skuCode": "I46u675r42l4",
        "realTimeSaleCnt": 0,
        "c7dSaleCnt": 0,
        "c30dSaleCnt": 0,
        "dt": ""
      }
    ]
  },
  "bbl": null,
  "traceId": "fe801921785899e"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001305。