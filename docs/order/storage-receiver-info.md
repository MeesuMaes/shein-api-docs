# 查询SHEIN仓库的收件信息

`GET /open-api/order/storage-receiver-info`

**QPS**：50 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v7 ｜ **更新时间**：2026-04-07 20:31:49 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3001660](https://open.sheincorp.com/documents/apidoc/detail/3001660)

## 接口说明

该接口固定查询佛山仓安博1号仓收件人信息，后续不再维护，建议使用/open-api/shipping/warehouse代替
1. code=0成功，code =1失败
2. 失败时失败信息在msg字段，
3. 失败时，info字段为空对象

## 响应参数

- **code** `integer` — 0成功，1失败 例: `0`
- **msg** `string` 例: `ok`
- **info** `object` **必填**
  - **address** `string` 例: `广东省广州市市天河区博物流中心3号仓`
  - **person** `string` 例: `王曾`
  - **phone** `string` 例: `13922720000`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl {{domain}}/open-api/order/storage-receiver-info?storage_id=120033
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "address": "广东省佛山市三水区大塘镇安博物流中心1号仓",
    "person": "周*兴",
    "phone": "13188888888"
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001660。