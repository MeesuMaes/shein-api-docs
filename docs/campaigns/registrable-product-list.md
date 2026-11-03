# 查询活动可报商品列表

`POST /open-api/campaigns/registrable-product-list`

**QPS**：15 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v14 ｜ **更新时间**：2026-09-01 14:30:22 ｜ **所属权限包**：[营销活动报名](/packages/campaign) ｜ **官方文档**：[3002014](https://open.sheincorp.com/documents/apidoc/detail/3002014)

## 接口说明

查询商家在指定活动中可报名的商品及报名要求，包括活动价格或降幅区间、活动件数要求和活动预留件数要求。
自运营模式需关注售价相关字段；半托管、全托管模式需关注供货价相关字段。
库存相关字段均为SKC维度；价格相关字段支持SKC和SKU维度，具体使用维度需根据查询活动详情接口返回的partakeScope 判断。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则
- **language** `string` **必填** — 指定出参语种，支持语种：英语：US，中文简体：CN，葡语：PT，西班牙语：ES，土耳其语：TR，法语：FR，德语：DE，泰语：TH

## 请求参数

- **pageNum** `integer` **必填** — 页码，从1开始。
- **pageSize** `integer` **必填** — 每页数量，最大100。
- **activityId** `integer` **必填** — 活动ID
- **skcList** `string[]` — SKC，最多100个。

## 响应参数

- **msg** `string` — 错误描述，成功：OK
- **code** `string` — 响应编码，成功：0
- **info** `object` **必填** — 响应数据
  - **count** `integer` — 查询结果条数
  - **goodsInfoList** `object[]` — 可报商品信息及要求
    - **skc** `string` — SKC编码
    - **partakeRuleInfo** `object` — 当查询活动详情接口返回partakeScope=0时，需关注字段提供的SKC维度商品信息提报要求。
      - **siteRuleInfoList** `object[]` — 当查询活动详情接口返回partakeScope=0时，使用本字段获取SKC维度的活动价格提报范围。 半托管/全托管模式下，各站点报价要求一致，仅返回一组数据，且站点字段为空；自运营模式下，返回各可提报站点的报价要求。
        - **site** `string` — 站点，示例：shein-br。半托管/全托管模式下，站点字段为空。
        - **suggestPriceCurrency** `string` — 建议活动价格对应的币种，自运营模式使用，示例：BRL。
        - **minSuggestPrice** `string` — 建议活动价格最小金额，自运营模式使用。
        - **maxSuggestPrice** `string` — 建议活动价格最大金额，自运营模式使用。
        - **minSalePriceRate** `string` — 售价降幅最小值，自运营模式使用。
        - **maxSalePriceRate** `string` — 售价降幅最大值，自运营模式使用。
        - **minSupplyPriceRate** `string` — 供货价降幅最小值，半托管/全托管模式使用。
        - **maxSupplyPriceRate** `string` — 供货价降幅最大值，半托管/全托管模式使用。
        - **minVipSupplyPriceRate** `string` — VIP档位供货价降幅最小值，半托管/全托管模式使用。
        - **maxVipSupplyPriceRate** `string` — VIP档位供货价降幅最大值，半托管/全托管模式使用。
        - **minSvipSupplyPriceRate** `string` — SVIP档位供货价降幅最小值，半托管/全托管模式使用。
      - **minActStockNum** `string` — 最小活动件数
      - **maxActStockNum** `string` — 最大活动件数
      - **minReserveStockNum** `string` — 最小活动预留件数
    - **priceInfoList** `object[]` — 当查询活动详情接口返回partakeScope=0时，需关注本字段提供的SKC维度价格信息。 对于半托管/全托管模式，各站点供货价相同，仅返回一组价格数据，且站点字段为空；对于自运营模式，将返回各可报站点对应的售价。
      - **site** `string` — 站点，示例：shein-br。半托管/全托管模式下，站点字段为空。
      - **currency** `string` — 币种
      - **salePrice** `string` — SKC售价，自运营模式使用。
      - **supplyPrice** `string` — SKC供货价，半托管/全托管模式使用。
    - **skuInfoList** `object[]` — 当查询活动详情接口返回partakeScope=1时，需关注本字段提供的SKU信息。
      - **sku** `string` — SKU编码
      - **partakeRuleInfo** `object` — 当查询活动详情接口返回partakeScope=1时，需关注字段提供的SKU维度商品信息提报要求。
        - **siteRuleInfoList** `object[]` — 当查询活动详情接口返回partakeScope=1时，使用本字段获取SKU维度的活动价格提报范围。 半托管/全托管模式下，各站点报价要求一致，仅返回一组数据，且站点字段为空；自运营模式下，返回各可提报站点的报价要求。
          - **site** `string` — 站点，示例：shein-br。半托管/全托管模式下，站点字段为空。
          - **suggestPriceCurrency** `string` — 建议活动价格对应的币种，自运营模式使用，样例：BRL。
          - **minSuggestPrice** `string` — 建议活动价格最小金额，自运营模式使用。
          - **maxSuggestPrice** `string` — 建议活动价格最大金额，自运营模式使用。
          - **minSalePriceRate** `string` — 售价降幅最小值，自运营模式使用。
          - **maxSalePriceRate** `string` — 售价降幅最大值，自运营模式使用。
          - **minSupplyPriceRate** `string` — 供货价降幅最小值，半托管/全托管模式使用。
          - **maxSupplyPriceRate** `string` — 供货价降幅最大值，半托管/全托管模式使用。
          - **minVipSupplyPriceRate** `string` — VIP档位供货价降幅最小值，半托管/全托管模式使用。
          - **maxVipSupplyPriceRate** `string` — VIP档位供货价降幅最大值，半托管/全托管模式使用。
          - **minSvipSupplyPriceRate** `string` — SVIP档位供货价降幅最小值，半托管/全托管模式使用。
      - **priceInfoList** `object[]` — 当查询活动详情接口返回partakeScope=1时，需关注本字段提供的SKU维度价格信息。 对于半托管/全托管模式，各站点供货价相同，仅返回一组价格数据，且站点字段为空；对于自运营模式，将返回各可报站点对应的售价。
        - **site** `string` — 站点，示例：shein-br。半托管/全托管模式下，站点字段为空。
        - **currency** `string` — 币种
        - **salePrice** `string` — SKU售价，自运营模式使用。
        - **supplyPrice** `string` — SKU供货价，半托管/全托管模式使用。
    - **isMultiSize** `integer` — 是否分尺码定价：0表示非分尺码定价，SKC下各SKU价格相同；1表示分尺码定价，SKC下各SKU价格可不同。 当活动详情接口返回partakeScope=1且isMultiSize=0时，同一SKC下各SKU提报的活动价格须一致，包括活动供货价、同一站点活动售价或售价降幅。
    - **stock** `integer` — SKC总可用库存
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/campaigns/registrable-product-list' \
--header 'language: us' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1772177423043' \
--header 'Content-Type: application/json' \
--data-raw '{
  "pageNum": 1,
  "pageSize": 10,
  "activityId": 34557,
  "skcList": [
    "sm251125158604512608"
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
    "count": 1645,
    "goodsInfoList": [
      {
        "skc": "sm251125158604512608",
        "partakeRuleInfo": {
          "siteRuleInfoList": [
            {
              "minSupplyPriceRate": "5",
              "maxSupplyPriceRate": "99",
              "minVipSupplyPriceRate": "10",
              "maxVipSupplyPriceRate": "99",
              "minSvipSupplyPriceRate": "15"
            }
          ]
        },
        "skuInfoList": [
          {
            "sku": "I3d9608pb313",
            "partakeRuleInfo": {
              "siteRuleInfoList": [
                {
                  "minSupplyPriceRate": "5",
                  "maxSupplyPriceRate": "99",
                  "minVipSupplyPriceRate": "10",
                  "maxVipSupplyPriceRate": "99",
                  "minSvipSupplyPriceRate": "15"
                }
              ]
            },
            "priceInfoList": [
              {
                "currency": "CNY",
                "supplyPrice": "32.14"
              }
            ]
          },
          {
            "sku": "I3d9608ptqi1",
            "partakeRuleInfo": {
              "siteRuleInfoList": [
                {
                  "minSupplyPriceRate": "5",
                  "maxSupplyPriceRate": "99",
                  "minVipSupplyPriceRate": "10",
                  "maxVipSupplyPriceRate": "99",
                  "minSvipSupplyPriceRate": "15"
                }
              ]
            },
            "priceInfoList": [
              {
                "currency": "CNY",
                "supplyPrice": "32.14"
              }
            ]
          }
        ],
        "stock": "536",
        "isMultiSize": 1,
        "priceInfoList": [
          {
            "currency": "CNY",
            "supplyPrice": "32.14"
          }
        ]
      }
    ]
  },
  "traceId": "15b74df548cec027"
}
```

&lt;/details>

## 其他场景示例

### 自运营模式

```json
{
  "msg": "OK",
  "code": "0",
  "bbl": null,
  "info": {
    "count": 1,
    "goodsInfoList": [
      {
        "skc": "sz25090494034633399",
        "partakeRuleInfo": {
          "siteRuleInfoList": [
            {
              "site": "shein-br",
              "minSalePriceRate": "15",
              "maxSalePriceRate": "98"
            }
          ]
        },
        "skuInfoList": [
          {
            "sku": "I6bbn2lgeq7t",
            "partakeRuleInfo": {
              "siteRuleInfoList": [
                {
                  "site": "shein-br",
                  "minSalePriceRate": "15",
                  "maxSalePriceRate": "98"
                }
              ]
            },
            "priceInfoList": [
              {
                "site": "shein-br",
                "currency": "BRL",
                "salePrice": "49.90"
              }
            ]
          }
        ],
        "stock": "3",
        "isMultiSize": 0,
        "priceInfoList": [
          {
            "site": "shein-br",
            "currency": "BRL",
            "salePrice": "49.90"
          }
        ]
      }
    ]
  },
  "traceId": "9dc5122ec9314d34"
}
```

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002014。