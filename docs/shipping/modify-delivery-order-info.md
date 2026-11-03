# 修改和取消发货单订单

`POST /open-api/shipping/modify-delivery-order-info`

**QPS**：100 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v13 ｜ **更新时间**：2026-10-13 15:11:45 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3002049](https://open.sheincorp.com/documents/apidoc/detail/3002049)

## 接口说明

该接口主要用于：1、修改发货单订单包裹数量和商品数量；2、取消发货单订单；
取消订单前，请查询订单状态： https://open.sheincorp.com/documents/apidoc/detail/3002009 ，如果status = 4:已送货，则表示目前有进行中的发货单，可以取消发货单，如果status = 5:已收货，7:已退货，10:已作废等其它状态，则无法取消发货单。
注意：箱唛和包裹类型的包裹数量入参不同，如需需求，请根据对应的入参设置。

## 请求头

- **Content-Type** `string` **必填** — application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **addUid** `string` **必填** — 操作人，默认填写openapi
- **deleteOrderNos** `string[]` — 传入取消发货的订单号。取消订单前请查询订单状态： https://open.sheincorp.com/documents/apidoc/detail/3002009 ，如果status = 4:已送货，则表示目前有进行中的发货单，可以取消发货单，如果status = 5:已收货，7:已退货，10:已作废等其它状态，则无法取消发货单。
- **deliveryNo** `string` **必填** — 发货单号
- **list** `object[]` — 发货订单数据，如果需要修改发货单，则需要传入参数。
  - **deliveryQuantity** `integer` — 订单商品数量
  - **orderNo** `string` — 订单编号
  - **packageNum** `integer` — 订单的包裹数量，只对类型=箱唛有效，请确认包裹类型
  - **skuCode** `string` — sku编码
  - **packingInfoList** `object` — 装箱明细，仅备货海外仓场景可用
    - **packQuantity** `integer` — 装箱数量，仅备货海外仓场景可用
- **packageNumber** `integer` — 快递单对应包裹总数量

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
- **msg** `string` — 错误描述,成功：OK；支持指定语种出参；
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
修改发货单订单示例
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/shipping/modify-delivery-order-info' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
  "addUid": "2324",
  "deleteOrderNos": [ ],
  "deliveryNo": "20240223100005",
  "list": [
    {
      "deliveryQuantity": 1000,
      "orderNo": "B240222501030",
      "skuCode": "I51tgzcvk8hl"
    }
  ],
  "packageNumber": 1
}'


取消发货单订单示例
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/shipping/modify-delivery-order-info' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
  "addUid": "2324",
  "deleteOrderNos":["B240129500029","B240129"],
  "deliveryNo":"20240129100026",
  "list": [


  ],
  "packageNumber": 2 
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": null,
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002049。