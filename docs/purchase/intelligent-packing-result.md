# 查询智能拆包结果接口

`POST /open-api/purchase/intelligent-packing-result`

**QPS**：30 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2026-09-23 21:49:44 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3002042](https://open.sheincorp.com/documents/apidoc/detail/3002042)

## 接口说明

用于采购单发货之前，查询平台智能拆包的结果，可以帮助开发者判断如何创建发货单

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **sellerOrderNos** `string[]` **必填** — 订单号集合，单次请求最多1000个订单号

## 响应参数

- **info** `object` — 智能拆包响应体
  - **groups** `object` — 发货分组
    - **goodsNum** `string` — 商品件数
    - **orderNum** `string` — 订单数
    - **orders** `object` — 订单信息
      - **countryMarket** `integer` — 国家市场：0:空，1:南大区（欧洲市场），2:北大区（美国市场）
      - **sellerOrderNo** `string` — 订单号
      - **state** `integer` — 订单状态（1:分单中,2:待发货,3:已送货,4:已收货,5:已退货,6:已完成,7:已上架,8:已作废）
    - **rules** `object` — 拆包规则明细
      - **ruleCode** `integer` — 拆包规则,1:公司主体,2:订单大仓,3:订单类型,4:结算方式,5:备货类型,6:账单币种,7:国家市场,8:商品品类,9:预估收货仓
      - **ruleDesc** `string` — 拆包规则描述,如:预估收货仓,国家线,成衣类型
      - **ruleValue** `object` — 拆包规则具体的值,如1347,1,2
      - **ruleValueDesc** `string` — 拆包规则具体的值描述,如:华东质检仓,欧洲市场,成衣
  - **undeliverableOrders** `object` — 不可发货的订单列表
    - **sellerOrderNo** `string` — 订单号
    - **undeliverableReasons** `string[]` — 不可发货原因列表
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/purchase/intelligent-packing-result' \
--header 'Content-Type: application/json' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "sellerOrderNos": ["PO2026092300001", "PO2026092300002", "PO2026092300003"]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "groups": [
      {
        "goodsNum": "500",
        "orderNum": "2",
        "orders": [
          {
            "countryMarket": 1,
            "sellerOrderNo": "PO2026092300001",
            "state": 2
          },
          {
            "countryMarket": 1,
            "sellerOrderNo": "PO2026092300002",
            "state": 2
          }
        ],
        "rules": [
          {
            "ruleCode": 9,
            "ruleDesc": "预计收货仓",
            "ruleValue": "1347",
            "ruleValueDesc": "华东质检仓"
          },
          {
            "ruleCode": 7,
            "ruleDesc": "国家/市场",
            "ruleValue": "1",
            "ruleValueDesc": "南区（欧洲市场）"
          },
          {
            "ruleCode": 8,
            "ruleDesc": "产品品类",
            "ruleValue": "2",
            "ruleValueDesc": "成衣"
          }
        ]
      },
      {
        "goodsNum": "300",
        "orderNum": "1",
        "orders": [
          {
            "countryMarket": 2,
            "sellerOrderNo": "PO2026092300003",
            "state": 2
          }
        ],
        "rules": [
          {
            "ruleCode": 9,
            "ruleDesc": "预计收货仓",
            "ruleValue": "1520",
            "ruleValueDesc": "华南质检仓"
          },
          {
            "ruleCode": 7,
            "ruleDesc": "国家/市场",
            "ruleValue": "2",
            "ruleValueDesc": "北区（美国市场）"
          }
        ]
      }
    ],
    "undeliverableOrders": [
      {
        "sellerOrderNo": "PO2026092300004",
        "undeliverableReasons": [
          "订单状态不满足发货条件",
          "SKU库存不足"
        ]
      }
    ]
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002042。