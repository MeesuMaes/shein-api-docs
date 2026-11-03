# 查询商家可选择的处理方式

`GET /open-api/purchase/return-disposals`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-06-04 13:49:24 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001771](https://open.sheincorp.com/documents/apidoc/detail/3001771)

## 接口说明

获取商家对退货申请单可选的处理方式（如退货、报废）

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 响应参数

- **code** `string` **必填** 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object[]`
  - **name** `string` — 退货申请单处理方式名称 例: `random_name`
  - **value** `integer` — 退货申请单处理方式枚举值:1-退货,2-报废 例: `44`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/purchase/return-disposals' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570849017' \
--data-raw ' '
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "value": 1,
      "name": "退货"
    },
    {
      "value": 2,
      "name": "报废"
    }
  ],
  "bbl": {},
  "traceId": "40f1539af07d739f"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001771。