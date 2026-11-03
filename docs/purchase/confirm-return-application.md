# 确认退货申请单

`POST /open-api/purchase/confirm-return-application`

**QPS**：20 ｜ **合作模式**：全托管 ｜ **文档版本**：v3 ｜ **更新时间**：2026-06-12 10:36:55 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001804](https://open.sheincorp.com/documents/apidoc/detail/3001804)

## 接口说明

通过该接口对状态为"待商家确认"的退货申请单执行确认操作

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **returnDealType** `integer` **必填** — 发起处理方式:1退货、2报废 例: `90`
- **returnAddressId** `int64` — 计划退货详细地址Id；当returnDealType=1退货时必填 例: `11`
- **snapshotVersion** `string` — 地址快照版本;当returnDealType=1退货时必填 例: `random_snapshotVersion`
- **distributionType** `integer` **必填** — 退货方式；1-SHEIN合作物流，4-自提；当returnDealType=1退货时必填 例: `39`
- **returnExpressCompanyCode** `string` — 退货物流公司代码；当returnDealType=1退货且distributionType=1-SHEIN合作物流时必填；其他场景不传 例: `random_returnExpressCompanyCode`
- **returnExpressCompanyName** `string` — 退货物流公司名称；当returnDealType=1退货且distributionType=1-SHEIN合作物流时必填；其他场景不传 例: `random_returnExpressCompanyName`
- **returnPlanNo** `string` **必填** — 退货申请单号 例: `random_returnPlanNo`

## 响应参数

- **code** `string` **必填** — 响应编码成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **data** `object[]`
  - **meta** `object`
    - **count** `integer` 例: `26`
    - **customObj** `object`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/open-api/purchase/confirm-return-application' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
    "returnDealType": "2",
    "returnPlanNo": "JH26052900000060"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {},
  "bbl": {},
  "traceId": "460f29775b380ab9"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001804。