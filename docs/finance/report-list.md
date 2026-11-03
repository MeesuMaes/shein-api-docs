# 报账单列表

`POST /open-api/finance/report-list`

**QPS**：50 ｜ **合作模式**：全托管 / POP ｜ **文档版本**：v10 ｜ **更新时间**：2026-03-26 14:19:56 ｜ **所属权限包**：[账单接口（全托&POP）](/packages/finance) ｜ **官方文档**：[3001626](https://open.sheincorp.com/documents/apidoc/detail/3001626)

## 接口说明

查询全托管店铺和POP模式的账单列表，当前仅支持查询2024年1月1日至今的数据，需要查询更多数据需要在商家后台操作；

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认英文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **addTimeEnd** `datetime` — 报账单生成时间结束值（北京时间）；格式：yyyy-MM-dd HH:mm:ss (报账单生成时间和最后更新时间任一必填，单次最多查询7天数据)
- **addTimeStart** `datetime` — 报账单生成时间开始值（北京时间）；格式：yyyy-MM-dd HH:mm:ss (报账单生成时间和最后更新时间任一必填，单次最多查询7天数据)
- **lastUpdateTimeEnd** `datetime` — 最后更新时间结束值（北京时间）；格式：yyyy-MM-dd HH:mm:ss (报账单生成时间和最后更新时间任一必填，单次最多查询7天数据)
- **lastUpdateTimeStart** `datetime` — 最后更新时间开始值（北京时间）；格式：yyyy-MM-dd HH:mm:ss (报账单生成时间和最后更新时间任一必填，单次最多查询7天数据)
- **page** `integer` **必填** — 页码
- **perPage** `integer` **必填** — 每页大小，最大200
- **settlementStatuses** `integer[]` — 结算状态；1：待确认/ 2：待结算/ 3：已结算/ 不传默认查所有

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **count** `integer` **必填** — 报账单总数
  - **reportOrderInfos** `object[]` — 报账单列表
    - **addTime** `datetime` **必填** — 报账单生成日期
    - **companyName** `string` **必填** — 公司主体名称
    - **completedPayTime** `datetime` — 实际付款时间
    - **currencyCode** `string` **必填** — 币种
    - **estimateIncomeMoneyTotal** `double` **必填** — 金额
    - **estimatePayTime** `datetime` **必填** — 预计付款时间
    - **expenseType** `integer` **必填** — 账单费用类型；0:商品/ 1:服务；明细费用类型；0:商品/ 1:服务；相同的bzOrderNo和skuCode可能在不同的报账单中以不同的费用明细给出；
    - **lastUpdateTime** `datetime` **必填** — 最后更新时间
    - **replenishTotal** `int64` — 补扣款数量
    - **reportOrderNo** `string` **必填** — 报账单号
    - **salesTotal** `int64` — 销售款明细数量
    - **settlementStatus** `integer` **必填** — 结算状态
    - **settlementStatusName** `string` **必填** — 结算状态名称；支持指定语种出参；
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/finance/report-list' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1752808873480' \
--header 'x-lt-signature: test' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
 "addTimeEnd": "2024-12-24 10:29:59",
 "addTimeStart":"2024-12-17 10:29:59",
 "page": 1,
 "perPage": 100
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "reportOrderInfos": [
      {
        "reportOrderNo": "B2412164523430915",
        "salesTotal": 0,
        "replenishTotal": 3,
        "addTime": "2024-12-17 19:46:38",
        "lastUpdateTime": "2024-12-17 19:47:12",
        "settlementStatus": 2,
        "settlementStatusName": "Pending settlement",
        "estimatePayTime": "2025-01-16 00:00:00",
        "completedPayTime": "",
        "companyName": "那就",
        "estimateIncomeMoneyTotal": 17.38,
        "currencyCode": "EUR"
      },
      {
        "reportOrderNo": "B2412164532016130",
        "salesTotal": 3,
        "replenishTotal": 0,
        "addTime": "2024-12-17 19:46:38",
        "lastUpdateTime": "2024-12-17 19:47:12",
        "settlementStatus": 2,
        "settlementStatusName": "Pending settlement",
        "estimatePayTime": "2025-01-16 00:00:00",
        "completedPayTime": "",
        "companyName": "TEST 公司",
        "estimateIncomeMoneyTotal": 43.8,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2412173138066433",
        "salesTotal": 1,
        "replenishTotal": 1,
        "addTime": "2024-12-17 19:46:38",
        "lastUpdateTime": "2024-12-17 19:48:03",
        "settlementStatus": 2,
        "settlementStatusName": "Pending settlement",
        "estimatePayTime": "2024-12-14 17:00:00",
        "completedPayTime": "",
        "companyName": "INFINITE STYLES SERVICES CO., LIMITED ",
        "estimateIncomeMoneyTotal": 781.54,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2412174644020226",
        "salesTotal": 1,
        "replenishTotal": 0,
        "addTime": "2024-12-17 19:46:38",
        "lastUpdateTime": "2024-12-17 19:48:04",
        "settlementStatus": 2,
        "settlementStatusName": "Pending settlement",
        "estimatePayTime": "2024-12-14 17:00:00",
        "completedPayTime": "",
        "companyName": "INFINITE STYLES SERVICES CO., LIMITED ",
        "estimateIncomeMoneyTotal": 43.8,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2412174651163650",
        "salesTotal": 1,
        "replenishTotal": 0,
        "addTime": "2024-12-17 19:46:38",
        "lastUpdateTime": "2024-12-17 19:48:04",
        "settlementStatus": 2,
        "settlementStatusName": "Pending settlement",
        "estimatePayTime": "2024-12-14 17:00:00",
        "completedPayTime": "",
        "companyName": "INFINITE STYLES SERVICES CO., LIMITED ",
        "estimateIncomeMoneyTotal": 43.8,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2412190026229760",
        "salesTotal": 0,
        "replenishTotal": 0,
        "addTime": "2024-12-19 00:06:40",
        "lastUpdateTime": "2024-12-25 14:13:41",
        "settlementStatus": 1,
        "settlementStatusName": "to be confirmed",
        "estimatePayTime": "2025-01-11 00:00:00",
        "completedPayTime": "",
        "companyName": "ROADGET BUSINESS PTE. LTD.",
        "estimateIncomeMoneyTotal": 94.56,
        "currencyCode": "USD"
      },
      {
        "reportOrderNo": "B2412190064568322",
        "salesTotal": 2,
        "replenishTotal": 0,
        "addTime": "2024-12-19 00:16:26",
        "lastUpdateTime": "2024-12-25 15:32:44",
        "settlementStatus": 1,
        "settlementStatusName": "to be confirmed",
        "estimatePayTime": "2025-01-11 00:00:00",
        "completedPayTime": "2025-12-19 00:16:25",
        "companyName": "ROADGET BUSINESS PTE. LTD.",
        "estimateIncomeMoneyTotal": 9.56,
        "currencyCode": "USD"
      },
      {
        "reportOrderNo": "B2412174812054529",
        "salesTotal": 2,
        "replenishTotal": 2,
        "addTime": "2024-12-19 14:02:49",
        "lastUpdateTime": "2024-12-25 15:19:57",
        "settlementStatus": 1,
        "settlementStatusName": "to be confirmed",
        "estimatePayTime": "2025-01-17 00:00:00",
        "completedPayTime": "2026-01-17 00:00:00",
        "companyName": "INFINITE STYLES SERVICES CO., LIMITED ",
        "estimateIncomeMoneyTotal": 82.04,
        "currencyCode": "USD"
      },
      {
        "reportOrderNo": "B2412183921686531",
        "salesTotal": 2,
        "replenishTotal": 2,
        "addTime": "2024-12-19 14:02:50",
        "lastUpdateTime": "2024-12-19 14:02:49",
        "settlementStatus": 1,
        "settlementStatusName": "to be confirmed",
        "estimatePayTime": "2025-01-16 00:00:00",
        "completedPayTime": "",
        "companyName": "INFINITE STYLES SERVICES CO., LIMITED ",
        "estimateIncomeMoneyTotal": 84.04,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2412185000214529",
        "salesTotal": 0,
        "replenishTotal": 0,
        "addTime": "2024-12-19 14:02:50",
        "lastUpdateTime": "2024-12-19 14:02:49",
        "settlementStatus": 1,
        "settlementStatusName": "to be confirmed",
        "estimatePayTime": "2025-01-16 00:00:00",
        "completedPayTime": "",
        "companyName": "INFINITE STYLES SERVICES CO., LIMITED ",
        "estimateIncomeMoneyTotal": 175.2,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2412192918793218",
        "salesTotal": 4,
        "replenishTotal": 4,
        "addTime": "2024-12-19 14:02:50",
        "lastUpdateTime": "2024-12-19 14:02:49",
        "settlementStatus": 1,
        "settlementStatusName": "to be confirmed",
        "estimatePayTime": "2025-01-16 00:00:00",
        "completedPayTime": "",
        "companyName": "那就75",
        "estimateIncomeMoneyTotal": 174.36,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2412193369681921",
        "salesTotal": 0,
        "replenishTotal": 2,
        "addTime": "2024-12-19 14:20:31",
        "lastUpdateTime": "2024-12-19 14:20:30",
        "settlementStatus": 1,
        "settlementStatusName": "to be confirmed",
        "estimatePayTime": "2025-01-16 00:00:00",
        "completedPayTime": "",
        "companyName": "TEST 公司",
        "estimateIncomeMoneyTotal": 205.05,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2403210004",
        "salesTotal": 1,
        "replenishTotal": 0,
        "addTime": "2024-12-19 14:51:03",
        "lastUpdateTime": "2024-12-23 17:29:08",
        "settlementStatus": 2,
        "settlementStatusName": "Pending settlement",
        "estimatePayTime": "2025-01-16 00:00:00",
        "completedPayTime": "",
        "companyName": "TEST 公司",
        "estimateIncomeMoneyTotal": 43.8,
        "currencyCode": ""
      },
      {
        "reportOrderNo": "B2412190180567041",
        "salesTotal": 1,
        "replenishTotal": 1,
        "addTime": "2024-12-19 14:51:03",
        "lastUpdateTime": "2024-12-23 17:28:45",
        "settlementStatus": 2,
        "settlementStatusName": "Pending settlement",
        "estimatePayTime": "2025-01-16 00:00:00",
        "completedPayTime": "",
        "companyName": "INFINITE STYLES SERVICES CO., LIMITED ",
        "estimateIncomeMoneyTotal": 43.02,
        "currencyCode": "CNY"
      },
      {
        "reportOrderNo": "B2412210147608576",
        "salesTotal": 3,
        "replenishTotal": 2,
        "addTime": "2024-12-21 00:37:32",
        "lastUpdateTime": "2024-12-23 17:27:21",
        "settlementStatus": 2,
        "settlementStatusName": "Pending settlement",
        "estimatePayTime": "2025-01-03 00:00:00",
        "completedPayTime": "",
        "companyName": "ROADGET BUSINESS PTE. LTD.",
        "estimateIncomeMoneyTotal": 156.8,
        "currencyCode": "USD"
      }
    ],
    "count": 15
  },
  "bbl": {},
  "traceId": "ba8e56514963c35e"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001626。