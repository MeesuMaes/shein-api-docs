# 查询活动报名记录列表

`POST /open-api/campaigns/registration-records`

**QPS**：15 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v10 ｜ **更新时间**：2026-10-23 17:57:09 ｜ **所属权限包**：[营销活动报名](/packages/campaign) ｜ **官方文档**：[3002074](https://open.sheincorp.com/documents/apidoc/detail/3002074)

## 接口说明

该接口用于查询营销活动报名记录，支持根据活动ID、SKC进行筛选，仅支持查询近5个月内的报名记录数据。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则
- **language** `string` **必填** — 指定出参语种，支持语种：英语：US，中文简体：CN，葡语：PT，西班牙语：ES，土耳其语：TR，法语：FR，德语：DE，泰语：TH

## 请求参数

- **pageNum** `integer` **必填** — 页码（从1开始）
- **pageSize** `integer` **必填** — 每页数量（最大100）
- **activityIdList** `integer[]` — 活动ID（最多100个）
- **skcList** `string[]` — SKC（最多100个）

## 响应参数

- **msg** `string` — 错误描述，成功：OK
- **code** `string` — 响应编码，成功：0
- **info** `object` — 响应数据
  - **count** `integer` — 总数
  - **goodsInfoList** `object[]` — 报名记录
    - **partakeGoodsId** `integer` — 报名记录ID
    - **activityId** `integer` — 活动ID
    - **skc** `string` — SKC编码
    - **siteInfoList** `object[]` — 自运营模式下，按站点提报的SKC维度活动价格信息。
      - **site** `string` — 报名站点，示例：shein-br。
      - **currency** `string` — 站点对应的币种，示例：BRL。
      - **enrollPrice** `string` — 按SKC维度提报的活动售价。
      - **enrollPriceLevel** `integer` — 活动售价命中的降幅档位。0：普通档，1：vip档，2：svip档。
      - **enrollSalePriceRate** `string` — 按SKC维度提报的售价降幅。
    - **supplyPriceInfo** `object` — 半托管、全托管模式下，按SKC维度提报的活动价格信息。
      - **currency** `string` — 供货价对应的币种，样例：BRL。
      - **enrollCostPrice** `string` — 按SKC维度提报的活动供货价。
      - **enrollPriceLevel** `integer` — 活动供货价命中的降幅档位。0：普通档，1：vip档，2：svip档。
      - **siteList** `string[]` — 报名站点，示例：shein-br。
    - **adjustForm** `integer` — 报价形式。1：活动价格（活动售价或活动供货价），6：售价降幅。
    - **actStock** `integer` — SKC维度活动件数。
    - **reserveStock** `integer` — SKC维度活动预留件数。
    - **auditStatus** `integer` — 报名审核状态。0：审核中，1：审核通过，2：审核不通过，4：取消报名，7：活动暂停，8：取消中。
    - **refuseReason** `string` — 审核不通过原因。
    - **partakeTime** `integer` — 报名时间。时间戳，单位毫秒。
    - **skuInfoList** `object[]` — 按SKU维度提报的信息
      - **sku** `string` — SKU编码
      - **siteInfoList** `object[]` — 自运营模式下，按站点提报的SKU维度活动价格信息。
        - **site** `string` — 报名站点，示例：shein-br。
        - **currency** `string` — 站点对应的币种，样例：BRL。
        - **enrollPrice** `string` — 按SKU维度提报的活动售价。
        - **enrollPriceLevel** `integer` — 活动售价命中的降幅档位。0：普通档，1：vip档，2：svip档。
        - **enrollSalePriceRate** `string` — 按SKU维度提报的售价降幅。
      - **supplyPriceInfo** `object` — 半托管/全托管模式下提报的SKU维度活动价格信息。
        - **currency** `string` — 供货价对应的币种，示例：BRL。
        - **enrollCostPrice** `string` — SKU维度提报的活动供货价。
        - **enrollPriceLevel** `integer` — 活动供货价命中的降幅档位。0：普通档，1：vip档，2：svip档。
        - **siteList** `string[]` — 报名站点，示例：shein-br。
    - **partakeScope** `integer` — 提报维度。0：SKC维度提报，1：SKU维度提报。
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/campaigns/registration-records' \
--header 'language: US' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1773044054162' \
--header 'Content-Type: application/json' \
--data-raw '{
  "pageNum": 1,
  "pageSize": 10,
  "skcList": [
    "sz25090494034633399"
  ],
  "activityIdList": [
    33710
  ]
}'
```

### 响应示例

```json
{
  "msg": "OK",
  "code": "0",
  "bbl": null,
  "info": {
    "count": 1,
    "goodsInfoList": [
      {
        "partakeGoodsId": "100001065903904",
        "activityId": "33710",
        "skc": "sz25090494034633399",
        "adjustForm": 6,
        "actStock": 0,
        "auditStatus": 4,
        "refuseReason": "",
        "partakeTime": "1770965556000",
        "skuInfoList": [
          {
            "sku": "I6bbn2lgeq7t",
            "siteInfoList": [
              {
                "site": "shein-br",
                "currency": "BRL",
                "enrollPrice": "42.41",
                "enrollSalePriceRate": "15"
              }
            ]
          }
        ],
        "partakeScope": 1
      }
    ]
  },
  "traceId": "5c3873164d32278d"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002074。