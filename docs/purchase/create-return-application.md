# 创建退货申请单

`POST /open-api/purchase/create-return-application`

**QPS**：20 ｜ **合作模式**：全托管 ｜ **文档版本**：v4 ｜ **更新时间**：2026-06-12 10:39:57 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001806](https://open.sheincorp.com/documents/apidoc/detail/3001806)

## 接口说明

商家主动发起退货申请，创建退货申请单

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **returnDealType** `integer` **必填** — 发起处理方式:1退货、2报废
- **returnModeList** `object[]` — 仓维度的退货方式列表；当returnDealType=1退货时必填，按仓库维度指定每个仓的退货方式；当returnDealType=2报废时，不传
  - **returnAddressId** `integer` — 计划退货详细地址Id；当distributionType=1-SHEIN合作物流时必填； 例: `38`
  - **snapshotVersion** `string` — 地址快照版本；当distributionType=1-SHEIN合作物流时必填 例: `random_snapshotVersion`
  - **distributionType** `integer` **必填** — 退货方式，必填；1-SHEIN合作物流；4-自提 例: `45`
  - **returnExpressCompanyCode** `string` — 退货物流公司代码；当distributionType=1-SHEIN合作物流时必填 例: `random_returnExpressCompanyCode`
  - **returnExpressCompanyName** `string` — 退货物流公司名称；当distributionType=1-SHEIN合作物流时必填 例: `random_returnExpressCompanyName`
  - **warehouseId** `integer` **必填** — SHEIN仓库id，必填；对应skuInfoList中warehouseInfoList的仓库维度 例: `60`
- **returnReason** `string` — 申请退货的原因说明 例: `random_returnReason`
- **skuInfoList** `object[]` — sku信息列表，必填；需要提供平台sku和申请数量
  - **platformSku** `string` **必填** — 平台sku 例: `random_platformSku`
  - **warehouseInfoList** `object[]` — 仓库列表
    - **quantity** `integer` **必填** — 申请退货数量 例: `60`
    - **warehouseId** `integer` — SHEIN仓库id 例: `4`
    - **warehouseName** `string` — SHEIN仓库名称 例: `random_warehouseName`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **returnPlanNoList** `string[]` — 创建成功的退货申请单列表 例: `random_returnPlanNoList`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/purchase/create-return-application' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570849017' \
--data-raw '{
  "orderNoList": [{
  "returnDealType": 1,
  "returnModeList": [
    {
      "returnAddressId": 20648,
      "returnExpressCompanyCode": "shunfeng",
      "returnExpressCompanyName": "顺丰",
      "distributionType": 1,
      "snapshotVersion": "CLMS2511050002",

      "warehouseId": 1
    }
  ],
  "returnReason": "test",
  "skuInfoList": [
    {
      "platformSku": "I924qkl0nnk2",
      "warehouseInfoList": [
        {
          "quantity": 2,
          "warehouseId": 1,
          "warehouseName": "佛山仓"
        }
      ]
    }
  ]
}"
  ]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "returnPlanNoList": [
      "JH26051300000014"
    ]
  },
  "bbl": {},
  "traceId": "cf3710d415a0d38d"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001806。