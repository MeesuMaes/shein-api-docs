# 查询SHEIN合作物流预估运费

`POST /open-api/openapi-business-backend/purchase-estimated-fee`

**QPS**：50 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2026-08-28 18:03:40 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3002011](https://open.sheincorp.com/documents/apidoc/detail/3002011)

## 接口说明

通过该接口查询shein合作物流的预估运费，适用于全托管、shein自营模式。欧洲地区的合作物流暂时不支持查询预估运费。

## 请求头

- **Content-Type** `string` **必填** — application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **addressId** `integer` **必填** — 发货地址id；从发货基本信息查询接口中获取；
- **agedProductCode** `string` **必填** — 时效产品编码；从物流产品查询接口获取；
- **expressInfoList** `object[]` **必填** — 查询物流公司信息；建议入参该时效产品下的所有物流公司；
  - **companyCode** `string` **必填** — 物流公司编码；从物流产品查询接口companyCode字段获取；
  - **isRecommend** `boolean` **必填** — 是否推荐物流公司；若物流公司是推荐物流的情况下必传；不传或乱传会影响费用的查询结果，但不会影响实际下单的费用）；
- **orderNoList** `string[]` **必填** — 订单号列表；全托管的场景该字段必填；
- **orderType** `integer` **必填** — 订单类型；1:急采/ 2:备货
- **weight** `double` **必填** — 重量；单位kg，支持小数点后4位；取实物克重或抛重的最大值计算；

## 响应参数

- **code** `string` — 成功：0
- **msg** `string` — 成功：OK
- **info** `object` — 返回的查询信息
  - **successList** `object[]` — 查询成功的物流公司
    - **companyCode** `string` — 物流公司编码
    - **convertedEstimatedDeduction** `double` — 预估扣款，2位小数；预估运费=预估扣款（convertedEstimatedDeduction）-平台权益免扣金额（rightsExemptionAmount）；
    - **currency** `string` — 币种
    - **exemptionAmount** `double` — 平台权益免扣金额
    - **isRecommend** `boolean` — 是否推荐物流
    - **rightsType** `integer` — 平台权益免扣类型
  - **failedList** `object[]` — 预估运费查询失败列表
    - **code** `string` — 错误编码
    - **companyCode** `string` — 物流公司编码
    - **reason** `string` — 失败原因

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/idms/review-orders' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1753080399011' \
--data-raw '{
    "agedProductCode": "SNV",
    "weight": "19.80",
    "orderType": 1,
    "addressId": 21189702,
    "orderNoList": [
        "PB2506250000027"
    ],
    "expressInfoList": [
        {
            "companyCode": "chemen",
            "isRecommend": true
        },
        {
            "companyCode": "kuayue",
            "isRecommend": false
        },
        {
            "companyCode": "TMS-anjun",
            "isRecommend": false
        },
        {
            "companyCode": "EULOG",
            "isRecommend": false
        }
    ]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "successList": [],
    "failedList": [
      {
        "code": "COSTESTIMATION0003",
        "companyCode": "chemen",
        "reason": "获取物流运费失败"
      },
      {
        "code": "COSTESTIMATION0003",
        "companyCode": "kuayue",
        "reason": "获取物流运费失败"
      },
      {
        "code": "COSTESTIMATION0003",
        "companyCode": "TMS-anjun",
        "reason": "获取物流运费失败"
      },
      {
        "code": "COSTESTIMATION0003",
        "companyCode": "EULOG",
        "reason": "获取物流运费失败"
      }
    ]
  },
  "traceId": "c2a98c0db5911d25"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002011。