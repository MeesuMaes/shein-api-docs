# 手工下备货单

`POST /open-api/idms/create-order`

**QPS**：50 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v7 ｜ **更新时间**：2026-09-23 21:40:03 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment)、[备货申请](/packages/stock-request) ｜ **官方文档**：[3002040](https://open.sheincorp.com/documents/apidoc/detail/3002040)

## 接口说明

该接口用于商家创建备货单（创建的备货单需等待平台审核），适用于部分全托管、自运营及半托管模式的商家。需要注意的是，备货单是指 SHEIN 面向供应商的采购订单，并非面向消费者的客单。如果需获取消费者相关的订单信息，请使用订单列表接口：/open-api/order/order-list

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **paramList** `object[]` **必填** — 下单参数
  - **skc** `string` **必填** — shein skc 编码
  - **skuCodeList** `object[]` **必填** — sku下单参数
    - **skuCode** `string` **必填** — shein sku 编码
    - **orderCount** `integer` **必填** — 下单数量

## 响应参数

- **code** `string` **必填** — 成功：0
- **msg** `string` **必填** — 成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/idms/create-order' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752156234723' \
--data-raw '{
  "paramList":[
      {"skc":"ss25042044640264012",
      "skuCodeList":[
          {
          "skuCode":"I5cmbaujgtlf",
          "orderCount":"100"
      }
      ]
      }
  ]
}'
```

### 响应示例

```json
{
  "code": "04905",
  "msg": "ss25042044640264012商品层次非备货款，不允许下单",
  "info": null,
  "bbl": null,
  "error": null,
  "traceId": "b4f652db618c2cd6"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002040。