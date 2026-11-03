# 查询SHEIN合作物流产品

`POST /open-api/shipping/express-company-list-v2`

**QPS**：50 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v12 ｜ **更新时间**：2026-08-19 22:25:40 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3001973](https://open.sheincorp.com/documents/apidoc/detail/3001973)

## 接口说明

通过该接口查询SHEIN合作物流的时效产品以及对应的物流公司；

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **addressId** `int64` **必填** — 发货地址ID，从接口获取
- **deliveryType** `string` **必填** — 发货方式，固定给1
- **orderType** `string` **必填** — 采购单类型 1：急采 /2：备货
- **reserveParcelTime** `string` **必填** — 预约取货时间(yyyy-MM-dd HH:mm:ss)
- **purchaseOrders** `object[]` **必填** — 采购单明细
  - **orderNo** `string` **必填** — 采购单号
  - **skuInfos** `object[]` **必填** — 采购单商品明细
    - **qty** `integer` **必填** — 采购单发货数量
    - **skuCode** `string` **必填** — SHEIN sku编码

## 响应参数

- **code** `string` — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK；支持指定语种出参；
- **info** `object`
  - **shippingMethods** `object[]` — 时效产品
    - **agedProductCode** `string` — 时效产品编码
    - **agedProductName** `string` — 时效产品名称；支持指定语种出参；
    - **expressInfos** `object[]` — 物流公司
      - **companyCode** `string` — 物流编码
      - **companyName** `string` — 物流公司名称
      - **isRecommend** `boolean` — 是否推荐物流
      - **recommendedPickupTime** `datetime` — 推荐取件时间
    - **purchaseOrders** `string[]` — 分堆采购单号

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/shipping/express-company-list-v2' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
  "type": 2,
  "addressId": "19687",
  "reserveParcelTime": "2024-08-31 10:29:59",
  "deliveryType": 1,
  "orderType": 1,
  "purchaseOrders": [
      {"orderNo":"J241210600019",
      "skuInfos": [
          {
              "qty": 1,
              "skuCode": "I62fjn9xnam8"
          }
      ]
      },
      {"orderNo":"J241210600017",
      "skuInfos": [
          {
              "qty": 1,
              "skuCode": "I62fjn9xnam8"
          }
      ]

      },
      {"orderNo":"J241210600021",
      "skuInfos": [
          {
              "qty": 1,
              "skuCode": "I62fjn9xnam8"
          }
      ]

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
    "shippingMethods": [
      {
        "agedProductCode": "GEF",
        "agedProductName": "默认时效产品",
        "purchaseOrders": [
          "B241217500033",
          "B241217500031",
          "B241217500032"
        ],
        "expressInfos": [
          {
            "companyName": "顺丰",
            "companyCode": "shunfeng",
            "isSupport": true,
            "isRecommend": false
          },
          {
            "companyName": "车门",
            "companyCode": "chemen",
            "isSupport": true,
            "isRecommend": true
          },
          {
            "companyName": "跨越",
            "companyCode": "kuayue",
            "isSupport": true,
            "isRecommend": false
          },
          {
            "companyName": "Anjun",
            "companyCode": "TMS-anjun",
            "isSupport": true,
            "isRecommend": false
          }
        ]
      }
    ]
  },
  "bbl": null,
  "traceId": "7caca8b96ad583a3"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001973。