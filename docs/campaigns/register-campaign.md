# 报名活动

`POST /open-api/campaigns/register-campaign`

**QPS**：15 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v15 ｜ **更新时间**：2026-09-08 17:04:44 ｜ **所属权限包**：[营销活动报名](/packages/campaign) ｜ **官方文档**：[3002032](https://open.sheincorp.com/documents/apidoc/detail/3002032)

## 接口说明

本接口用于提交活动商品的报名。调用前需先通过查询活动详情接口和查询活动可报商品列表接口获取报名规则与填报要求。
填报规则简述：
1. 基础必填信息
- 需填写的字段以活动详情接口返回的partakeFieldList为准（常见字段包括：活动价格、活动件数、活动预留件数）。
2. 活动价格填报
- 填报维度：由查询活动详情接口返回的partakeScope决定按SKC或SKU报价。若为SKU维度且isMultiSize=0，同一SKC下所有SKU的活动价格必须一致。
- 报价形式与区间：由查询活动详情接口返回的adjustForm决定报价方式（填报活动价格还是降幅），由查询活动可报商品列表接口返回的siteRuleInfoList获取价格或降幅的限制区间。
- 传参字段：自运营商家（按售价定价）通过报名活动接口的siteInfoList传入；半托管/全托管商家（按供货价定价）通过supplyPriceInfo传入。
3. 活动件数与预留件数
- 两者均按SKC维度进行填报。
- 活动件数：活动期间该SKC可按活动价销售的数量上限。
- 活动预留件数：活动期间该SKC必须保留的最低库存下限。
4. 站点报名要求
- 通过查询活动详情接口的supportSelectSitePartake判断是否支持选择部分站点报名。
- 若支持部分站点：自运营商家需在报名活动接口的siteInfoList中按站点传入对应币种的价格；半托管/全托管商家需在siteList中传入报名站点。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则
- **language** `string` **必填** — 指定出参语种，支持语种：英语：US，中文简体：CN，葡语：PT，西班牙语：ES，土耳其语：TR，法语：FR，德语：DE，泰语：TH

## 请求参数

- **activityId** `integer` **必填** — 活动ID
- **goodsInfoList** `object[]` **必填** — 提报商品信息，最多100个。
  - **skc** `string` **必填** — SKC编码
  - **actStock** `integer` — 活动件数按SKC维度提报。 先查询活动详情接口，若partakeFieldList包含2，则活动件数必传。再通过活动可报商品列表接口获取minActStockNum、maxActStockNum和stock，活动件数需在minActStockNum和maxActStockNum区间内，且不大于stock。
  - **reserveStock** `integer` — 活动预留件数按SKC维度提报。 先查询活动详情接口，若partakeFieldList包含3，则活动预留件数必传。再通过活动可报商品列表接口获取minReserveStockNum和stock，活动预留件数需不小于minReserveStockNum，且不大于stock。
  - **supplyPriceInfo** `object` — 半托管/全托管模式下，若活动详情接口返回partakeScope=0，则需通过本字段按SKC维度提报活动价格。
    - **siteList** `string[]` — 站点，示例：shein-br。 先查询活动详情接口：当supportSelectSitePartake=1时，本字段必传，且取值必须来自接口返回的siteList；当supportSelectSitePartake=0时，无需传入本字段。
    - **enrollCurrency** `string` **必填** — 半托管/全托管模式下的供货价币种，示例：BRL。 取值可通过查询活动详情接口返回的supplyPriceCurrency获取。
    - **enrollCostPrice** `string` **必填** — 按SKC维度提报活动供货价，计算公式为：活动供货价=供货价*（1-供货价降幅）。 其中，SKC供货价可通过查询活动可报商品列表接口获取。供货价降幅需参考该接口返回的minSupplyPriceRate、maxSupplyPriceRate、minVipSupplyPriceRate、maxVipSupplyPriceRate、minSvipSupplyPriceRate等字段，可从支持的降幅档位中任选其一进行提报。 通常支持填写至小数点后两位；若供货价币种为日元，仅支持填写整数。
  - **siteInfoList** `object[]` — 自运营模式下，若活动详情接口返回partakeScope=0，需通过本字段按站点提报SKC维度的活动价格。 其中，若supportSelectSitePartake=0，则需为siteList中全部站点提报活动价格；若supportSelectSitePartake=1，则可选择siteList中的部分站点提报。
    - **site** `string` **必填** — 站点，示例：shein-br。字段值需取自活动详情接口返回的siteList。
    - **enrollCurrency** `string` — 站点site对应的币种，示例：BRL。可通过查询活动详情接口返回的sellPriceSiteInfoList字段获取。
    - **enrollPrice** `string` — 按SKC维度提报活动售价。需先调用查询活动详情接口确认报价形式：当adjustForm=1时，需传入本字段。 活动售价需依据查询活动可报商品列表接口返回的siteRuleInfoList计算并校验： 1. 若返回建议活动价区间minSuggestPrice、maxSuggestPrice，则活动售价须在该区间内； 2. 若返回售价降幅区间minSalePriceRate、maxSalePriceRate，则需在该区间内选择降幅进行提报，计算公式为：活动售价=售价×(1-售价降幅)。其中，SKC售价可通过查询活动可报商品列表接口获取。 通常价格最多保留两位小数；若币种为日元，仅支持填写整数。
    - **enrollSalePriceRate** `string` — 按SKC维度提报售价降幅。请先调用查询活动详情接口确认报价形式：当adjustForm=6时，需传入本字段。 售价降幅的可提报范围可通过查询活动可报商品列表接口返回的minSalePriceRate和maxSalePriceRate字段获取。
  - **skuInfoList** `object[]` — 当活动详情接口返回partakeScope=1时，需通过该数组按SKU维度提报活动价格。
    - **sku** `string` **必填** — SKU编码
    - **supplyPriceInfo** `object` — 半托管/全托管模式下，若活动详情接口返回partakeScope=1，则需通过本字段按SKU维度提报活动价格。
      - **siteList** `string[]` — 站点，示例：shein-br。 先查询活动详情接口：当supportSelectSitePartake=1时，本字段必传，且取值必须来自接口返回的siteList；当supportSelectSitePartake=0时，无需传入本字段。
      - **enrollCurrency** `string` **必填** — 半托管/全托管模式下的供货价币种，示例：BRL。 取值可通过查询活动详情接口返回的supplyPriceCurrency获取。
      - **enrollCostPrice** `string` **必填** — 按SKU维度提报活动供货价，计算公式为：活动供货价=供货价*（1-供货价降幅）。 其中，SKU供货价可通过查询活动可报商品列表接口获取。供货价降幅需参考该接口返回的minSupplyPriceRate、maxSupplyPriceRate、minVipSupplyPriceRate、maxVipSupplyPriceRate、minSvipSupplyPriceRate等字段，可从支持的降幅档位中任选其一进行提报。 通常支持填写至小数点后两位；若供货价币种为日元，仅支持填写整数。
    - **siteInfoList** `object[]` — 自运营模式下，若活动详情接口返回partakeScope=1，需通过本字段按站点提报SKU维度的活动价格。 其中，若supportSelectSitePartake=0，则需为siteList中全部站点提报活动价格；若supportSelectSitePartake=1，则可选择siteList中的部分站点提报。
      - **site** `string` **必填** — 站点，示例：shein-br。字段值需取自活动详情接口返回的siteList。
      - **enrollCurrency** `string` — 站点site对应的币种，示例：BRL。可通过查询活动详情接口返回的sellPriceSiteInfoList字段获取。
      - **enrollPrice** `string` — 按SKU维度提报活动售价。需先调用查询活动详情接口确认报价形式：当adjustForm=1时，需传入本字段。 活动售价需依据查询活动可报商品列表接口返回的siteRuleInfoList计算并校验： 1. 若返回建议活动价区间minSuggestPrice、maxSuggestPrice，则活动售价须在该区间内； 2. 若返回售价降幅区间minSalePriceRate、maxSalePriceRate，则需在该区间内选择降幅进行提报，计算公式为：活动售价=售价×(1-售价降幅)。其中，SKU售价可通过查询活动可报商品列表接口获取。 通常价格最多保留两位小数；若币种为日元，仅支持填写整数。
      - **enrollSalePriceRate** `string` — 按SKU维度提报售价降幅。请先调用查询活动详情接口确认报价形式：当adjustForm=6时，需传入本字段。 售价降幅的可提报范围可通过查询活动可报商品列表接口返回的minSalePriceRate和maxSalePriceRate字段获取。

## 响应参数

- **msg** `string` — 错误描述，成功：OK
- **code** `string` — 响应编码，成功：0
- **info** `object` — 响应数据
  - **failedList** `object[]` — 失败列表
    - **skc** `string` — SKC
    - **code** `string` — 失败原因code
    - **reason** `string` — 失败原因说明
  - **successList** `object[]` — 成功列表
    - **skc** `string` — SKC编码
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://open.sheincorp.com/open-api/campaigns/register-campaign' \
--header 'language: US' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1773049497787' \
--header 'Content-Type: application/json' \
--data-raw '{
  "activityId": 230664174,
  "goodsInfoList": [
    {
      "skc": "sM23031468488516",
      "skuInfoList": [
          {
            "sku": "I7blchy8xuyj",
            "siteInfoList": [
              {
                "site": "shein-us",
                "enrollPrice": "10.62",
                "enrollSalePriceRate": "91"
              },
              {
                "site": "shein-br",
                "enrollPrice": "55.99",
                "enrollSalePriceRate": "92"
              }
            ]
          },
          {
            "sku": "I7blchy935oe",
            "siteInfoList": [
              {
                "site": "shein-us",
                "enrollPrice": "10.62",
                "enrollSalePriceRate": "90"
              },
              {
                "site": "shein-br",
                "enrollPrice": "55.90",
                "enrollSalePriceRate": "95"
              }
            ]
          }
        ]
    }
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
    "successList": [
      {
        "skc": "sM23031468488516"
      }
    ]
  },
  "traceId": "cb768f1485e8a72e"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002032。