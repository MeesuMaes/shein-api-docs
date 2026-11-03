# 查询退货可选择的物流

`POST /open-api/purchase/return-carriers`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v5 ｜ **更新时间**：2026-06-09 14:45:36 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001796](https://open.sheincorp.com/documents/apidoc/detail/3001796)

## 接口说明

当选择处理方式是退货且使用退货方式是SHEIN合作物流时，可通过此接口获取退货收货地址支持的物流商

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **stateId** `integer` **必填** — 收件地省州ID 例: `13`
- **transportAreaCountryCode** `string` **必填** — 运输区域，国家二字码 例: `random_transportAreaCountryCode`
- **warehouseIds** `integer[]` **必填** — 仓库id列表 例: `74`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **list** `object[]` — 物流公司列表
    - **companyCode** `string` — 物流公司编码 例: `random_companyCode`
    - **companyName** `string` — 物流公司名称 例: `random_companyName`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/purchase/return-carriers' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
  "stateId": 112069,
  "transportAreaCountryCode": "CN",
  "warehouseIds": [
    1
  ]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "list": [
      {
        "companyCode": "shunfeng",
        "companyName": "顺丰"
      },
      {
        "companyCode": "youzheng",
        "companyName": "邮政"
      },
      {
        "companyCode": "chemen",
        "companyName": "车门"
      }
    ]
  },
  "bbl": {},
  "traceId": "591012d018200cb2"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001796。