# 报账单补扣款收支明细

`POST /open-api/finance/report-adjustment-detail`

**QPS**：50 ｜ **合作模式**：全托管 / POP ｜ **文档版本**：v13 ｜ **更新时间**：2026-03-26 14:20:07 ｜ **所属权限包**：[账单接口（全托&POP）](/packages/finance) ｜ **官方文档**：[3001628](https://open.sheincorp.com/documents/apidoc/detail/3001628)

## 接口说明

该接口支持全托管和POP模式的商家通过报账单号查询补扣款明细数据；报账单号请通过【报账单列表】接口中的reportOrderNo获取；

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认英文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **query** `string` — 下一页数据查询的值
- **perPage** `integer` **必填** — 每页大小，最大200
- **reportOrderNo** `string` **必填** — 报账单号

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **count** `integer` **必填** — 对账单明细总数
  - **query** `string` — 若该字段有值，代表有下一页数据，用该字段的值去查询下一页数据
  - **reportReplenishDetail** `object[]` — 对账单明细信息
    - **addTime** `datetime` **必填** — 账单生成时间
    - **amount** `double` **必填** — 金额
    - **bzOrderNo** `string` — 业务单号
    - **companyName** `string` **必填** — 公司主体
    - **expenseType** `integer` **必填** — 明细费用类型；0:商品/ 1:服务；相同的bzOrderNo和skuCode可能在不同的报账单中以不同的费用明细给出；
    - **goodsCount** `integer` **必填** — 商品数量
    - **id** `string` **必填** — 对账单明细 id
    - **replenishCategory** `string` **必填** — 补扣款分类
    - **replenishNo** `string` **必填** — 补扣款单号
    - **replenishType** `integer` **必填** — 款项类型；1：补款/ 2：扣款
    - **replenishTypeName** `string` **必填** — 款项类型名称，补款/扣款
    - **settleCurrencyCode** `string` **必填** — 结算币种
    - **skcName** `string` — SKC
    - **skuCode** `string` — 平台SKU
    - **supplierSku** `string` — 商家sku；若账单生成后商家修改了商品绑定的商家sku，返回的是修改后的商家sku；
    - **unitPrice** `double` — 单价
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/finance/report-adjustment-detail' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1752818871649' \
--header 'x-lt-signature: test' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
 "perPage": "3",
 "reportOrderNo":"B2412210147608576"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "reportReplenishDetail": [
      {
        "replenishNo": "K2411213727879170",
        "replenishType": 1,
        "replenishTypeName": "chargeback",
        "replenishCategory": "Purchasing quality-Customer refund deduction",
        "id": "OF2411213727837185",
        "bzOrderNo": "B240507500057",
        "unitPrice": 7.02,
        "skcName": "s23030915354544",
        "skuCode": null,
        "goodsCount": 1,
        "settleCurrencyCode": "USD",
        "amount": 7.02,
        "companyName": "ROADGET BUSINESS PTE. LTD.",
        "addTime": "2024-11-21 15:48:02"
      },
      {
        "replenishNo": "K2412210112483330",
        "replenishType": 2,
        "replenishTypeName": "Replenishment",
        "replenishCategory": "purchase supplement-Shipping and miscellaneous expenses supplement",
        "id": "OF2412210112467971",
        "bzOrderNo": "B240507500057",
        "unitPrice": 10.99,
        "skcName": "s23030915354544",
        "skuCode": null,
        "goodsCount": 2,
        "settleCurrencyCode": "USD",
        "amount": 21.98,
        "companyName": "ROADGET BUSINESS PTE. LTD.",
        "addTime": "2024-12-21 00:28:37"
      }
    ],
    "count": 2,
    "query": null
  },
  "bbl": {},
  "traceId": "1259ed66a0aa6baa"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001628。