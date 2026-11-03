# JIT母单及子单对应关系查询接口

`GET /open-api/order/get-mothe-child-orders`

**QPS**：40 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v8 ｜ **更新时间**：2026-06-15 10:04:14 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3001813](https://open.sheincorp.com/documents/apidoc/detail/3001813)

## 接口说明

1.入参orderNos，selectJitMother必填，orderNos最多支持200个订单
2.info是个列表，列表实体必返回请求的订单号，motherOrChildOrders=空列表（不为null）的情况：
1）订单的商家与请求的商家不一致，
2）非JIt订单
3）查询的订单与selectJitMother不一致
实现逻辑：遍历请求订单编号，校验，如果订单是JIt母单 && 请求查询母单 则motherOrChildOrders为对应的子单信息
如果订单是JIt子单 && 请求查询非母单 且 则motherOrChildOrders为对应的母单信息
如果订单是JIt合单 && 请求查询非母单 且 则motherOrChildOrders为对应的母单信息
code=0返回成功，其他为异常，异常信息取msg

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 响应参数

- **code** `string` — 状态码
- **msg** `string` — 提示信息
- **info** `object[]` — 响应信息
  - **orderNo** `string` **必填** — 查询订单号
  - **motherOrChildOrders** `object[]` **必填** — 如果是JIt母单，则列表存其关联子单；如果是Jit子单或JIt合单，则表存其关联母单，否则为空列表[]
    - **orderNo** `string` — 关联的订单号
    - **status** `string` — 订单状态：1待下单（暂时不支持），2已下单，3发货中，4已送货，5已收货，6已查验，7已退货，8已完成，9无货下架，10已作废，11待审核，12分单中 13待退货 14全部触发
    - **statusName** `string` — 订单状态：1待下单（暂时不支持），2已下单，3发货中，4已送货，5已收货，6已查验，7已退货，8已完成，9无货下架，10已作废，11待审核，12分单中 13待退货 14全部触发
- **error** `string` — 错误码
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi.sheincorp.cn/open-api/order/get-mothe-child-orders?orderNos=J230517600016,J230619600017,J230614600034&selectJitMother=1' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570729613' \
--header 'language: EN' \
--data-raw ''
```

### 响应示例

```json
{
  "code": "0",
  "msg": "",
  "info": [
    {
      "orderNo": "J230517600016",
      "motherOrChildOrders": []
    },
    {
      "orderNo": "J230619600017",
      "motherOrChildOrders": []
    },
    {
      "orderNo": "J230614600034",
      "motherOrChildOrders": []
    }
  ],
  "error": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001813。