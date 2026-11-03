# 备货单审核列表

`POST /open-api/idms/review-orders`

**QPS**：50 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v4 ｜ **更新时间**：2026-09-23 21:43:48 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment)、[备货申请](/packages/stock-request) ｜ **官方文档**：[3002041](https://open.sheincorp.com/documents/apidoc/detail/3002041)

## 接口说明

通过该接口查询申请备货的审核信息列表，适用全托管，备货到shein仓（SFS）的自运营、半托管模式的商家；

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **skcList** `string[]` — shein skc 编码
- **supplierCodeList** `string[]` — 供方或号
- **orderNoList** `string[]` — 备货单号
- **addTimeBegin** `string` — 开始的创建时间
- **addTimeEnd** `string` — 结束的创建时间
- **pageNum** `string` — 页码
- **pageSize** `string` — 每页数量

## 响应参数

- **code** `string` — 成功：0
- **msg** `string` — 成功：OK
- **info** `object`
  - **count** `integer` — 总数
  - **list** `object[]` — 备货申请列表
    - **id** `integer`
    - **imgPath** `string` — skc图片链接
    - **supplierCode** `string` — 供方货号
    - **skc** `string` — shein skc 编码
    - **orderMode** `string` — 备货申请单的下单方式
    - **applyStatus** `string` — 申请状态
    - **orderAccount** `string` — 下单账号
    - **stockType** `string` — 备货类型
    - **orderSign** `string` — 下单标识
    - **applyNotes** `string` — 审核说明
    - **orderNo** `string` — 备货单号
    - **skuList** `object[]` — 备货申请sku信息
      - **skuCode** `string` — shein sku 编码
      - **suffixZh** `string` — 属性集
      - **orderCount** `integer` — 实际下单数量
      - **adviceCount** `integer` — 建议下单数量
    - **addTime** `string` — 下单时间

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/idms/review-orders' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752201122529' \
--data-raw '{
 
 
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "count": 0,
    "list": []
  },
  "bbl": null,
  "traceId": "666d308310855ef5"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002041。