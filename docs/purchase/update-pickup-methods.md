# 修改退货单的退货方式

`POST /open-api/purchase/update-pickup-methods`

**QPS**：20 ｜ **合作模式**：全托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-06-04 13:50:45 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001781](https://open.sheincorp.com/documents/apidoc/detail/3001781)

## 接口说明

在退货单退货前，通过此接口修改退货单的退货方式、地址及承运商

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识，openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **distributionType** `integer` **必填** — 退货方式，必填；1-SHEIN合作物流；4-自提 例: `85`
- **expressInfo** `object` — 快递信息；当distributionType=1-SHEIN合作物流时必填
  - **addressId** `integer` — 退货地址ID，必填 例: `58`
  - **companyCode** `string` — 退货物流公司Code，必填； 例: `random_companyCode`
  - **snapshotVersion** `string` — 地址快照版本，必填 例: `random_snapshotVersion`
- **returnOrderId** `integer` — 退货单Id；returnOrderNo与returnOrderId必须传其中之一 例: `44`
- **returnOrderNo** `string` — 退货单号；returnOrderNo与returnOrderId必须传其中之一 例: `random_returnOrderNo`
- **selfPickup** `object` — 自提信息
  - **driverId** `string` — 司机id（非必填） 例: `random_driverId`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **data** `object[]`
  - **meta** `object`
    - **count** `integer` 例: `80`
    - **customObj** `object`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/open-api/purchase/update-pickup-methods' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
  "expressInfo": {
    "addressId": 20650,
    "companyCode": "youzheng"
  },
  "returnOrderNo": "TG26052100018",
  "distributionType": 1
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {},
  "bbl": {},
  "traceId": "bbcde326258bcc22"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001781。