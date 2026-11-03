# 查询活动详情

`POST /open-api/campaigns/campaign-detail`

**QPS**：15 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v13 ｜ **更新时间**：2026-08-28 17:35:09 ｜ **所属权限包**：[营销活动报名](/packages/campaign) ｜ **官方文档**：[3002006](https://open.sheincorp.com/documents/apidoc/detail/3002006)

## 接口说明

通过接口获取营销活动详情，包括活动时间、活动站点、报名形式、对店铺和商品的要求等。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则
- **language** `string` **必填** — 指定出参语种，支持语种：英语：US，中文简体：CN，葡语：PT，西班牙语：ES，土耳其语：TR，法语：FR，德语：DE，泰语：TH

## 请求参数

- **activityId** `integer` **必填** — 活动ID

## 响应参数

- **msg** `string` — 错误描述，成功：OK
- **code** `string` — 响应编码，成功：0
- **info** `object` — 响应数据
  - **activityId** `integer` — 活动ID
  - **activityName** `string` — 活动名称
  - **activityType** `integer` — 活动类型（1：频道； 2：清仓； 3：大促；4：日常）
  - **partakeStartTime** `integer` — 报名开始时间。时间戳，单位毫秒。
  - **partakeEndTime** `integer` — 报名结束时间。时间戳，单位毫秒。
  - **activityStartTime** `integer` — 活动开始时间。时间戳，单位毫秒。
  - **activityEndTime** `integer` — 活动结束时间。时间戳，单位毫秒。
  - **activityIntroduction** `string` — 活动介绍。html格式，图片链接或文本。
  - **storeRequirementList** `object[]` — 店铺规则
    - **requirementKey** `string` — 规则标题
    - **requirementDesc** `string` — 规则描述
    - **isMeetRequirement** `integer` — 是否符合要求。0：不符合，1：符合。
  - **goodsRequirementSetList** `object[]` — 商品规则集
    - **ruleSetId** `integer` — 规则集ID
    - **requirementList** `object[]` — 规则列表
      - **requirementKey** `string` — 规则标题
      - **requirementDesc** `string` — 规则描述
      - **isMeetRequirement** `integer` — 是否符合要求。0：不符合，1：符合。
  - **partakeFieldList** `integer[]` — 填报表单项，即报名活动时需填写的商品信息。 1：活动价格或降幅，2：活动件数，3：活动预留件数。
  - **adjustForm** `integer` — 报价形式，指后续报名商品时采用的价格提报方式。1：活动价格（活动售价或活动供货价），6：售价降幅。
  - **partakeScope** `integer` — 提报维度，通过该字段判断报名商品时要按SKC维度报价还是SKU维度报价。 0：SKC维度提报，1：SKU维度提报。
  - **benefitImage** `string` — 权益说明图片。对比不同降幅档位报价下，商品在流量扶持、平台补贴和商品展示等方面的权益差异。
  - **lockInfo** `string` — 锁信息。文字描述，说明活动期间对已报商品价格或库存的锁定情况。 示例：“活动期间，报名未取消的商品不可调高价格”
  - **maxPartakeGoodsNum** `integer` — 每店铺最大提报SKC商品数量。
  - **dependOnActivityId** `integer` — 关联报名活动ID。报名本活动的前提，要先报名关联报名活动ID。
  - **supplyPriceCurrency** `string` — 供货价商家（即半托管、全托管模式）报价币种
  - **sellPriceSiteInfoList** `object` — 售价商家（即自运营模式）可报站点对应币种
    - **site** `string` — 站点，样例：shein-br
    - **currency** `string` — 币种，样例：BRL
  - **canPartake** `integer` — 是否可报名。0：不可报，1：可报。
  - **cannotPartakeReason** `string` — 不可报名原因
  - **supportSelectSitePartake** `integer` — 是否支持从所有可报站点中选择部分站点报名活动。0：不支持，1：支持。
  - **siteList** `string[]` — 可报名活动站点
- **traceId** `string` — 请求的唯一标识，用于异常报错跟踪。

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/campaigns/campaign-detail' \
--header 'language: US' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1772096482203' \
--header 'Content-Type: application/json' \
--data-raw '{
  "activityId": "33710"
}'
```

### 响应示例

```json
{
  "msg": "OK",
  "code": "0",
  "bbl": null,
  "info": {
    "activityId": "33710",
    "activityName": "[GLOBAL SALE]  \"SHEIN 2026 Music Festival / Wedding Season\": Regular Promotion – Self-Operated and Self-Pricing Sellers - VIP Tier Registration",
    "activityType": "3",
    "partakeStartTime": "1770220800000",
    "partakeEndTime": "1772697599000",
    "activityStartTime": "1774195200000",
    "activityEndTime": "1775491199000",
    "activityIntroduction": "<p>一、Timeline</p><p>Registration Period (PST): 2/4/2026 (08:00:00) – 3/4/2026 (23:59:59)</p><p>Campaign Period (PST): 3/22/2026 (09:00:00) – 4/6/2026 (08:59:59)</p><p>二、Benefits</p><p>⚠️This registration portal is for the  [GLOBAL SALE]  \"SHEIN 2026 Music Festival / Wedding Season\": Regular Promotion - VIP Tier Registration</p><p><br></p><p>♻️When registering products, the \"discount requirements\" will be displayed simultaneously. Once products are successfully registered and the campaign is live, you will receive the following exclusive VIP Tier benefits:</p><p><br></p><p><br></p><p>💎Exclusive VIP Tier Benefits: </p><p>-Campaign Landing Page Feature</p><p>-Product Belt Feature</p><p>-Homepage Banner Feature</p><p>三、Event Information</p><p>1. Event Description</p><p>To meet customers' needs for new-season outfits and shopping, SHEIN's platform is hosting a large-scale  \"SHEIN 2026 Music Festival / Wedding Season\" promotion. The sale event aims to help sellers quickly gain traffic and accelerate product sales through discounts and targeted traffic support, boosting revenue and driving performance growth. Products participating in the event will be displayed across multiple SHEIN resources, subject to the actual display during the event launch.</p><p><br></p><p>2. Event Rules</p><p>a) Entry Requirements:</p><p>✅ Limited invitations for sellers/products to participate</p><p>❌ Denied cases:</p><p>-Failure to meet requirements at registration (submission rules not followed)</p><p>-Products judged as inferior quality (failed review)</p><p><br></p><p>b) Withdrawal Rules</p><p>⚠️ Cancellation is only allowed during the registration period.</p><p>🔒 Once approved, no withdrawals are allowed after the registration deadline.</p><p><br></p><p>c) Product Requirements</p><p>📦 No mandatory stock preparation required. It is, however, recommended that sellers prepare an appropriate inventory of goods for display during promotions.</p><p>❌ Counterfeit goods are strictly prohibited. All infringing products (including counterfeit products and those that may cause confusion with other brands due to similar product names, packaging, design, logos, company names, or product quality marks) are strictly prohibited and will result in failed reviews, removals during the event, and/or cancellation of displays.</p><p><br></p><p>3. Activity Process</p><p>Approved: Platform releases event → Seller registers → Platform reviews → Approved → Seller prepares stock → Event launches</p><p>Rejected: Platform releases event → Seller registers → Platform reviews → Rejected → Process ends</p><p>*Merchants only need to register products and prepare stock before the specified deadline for approved products.</p><p><br></p><p>4. Settlement Rules</p><p>a) Calculation Basis:</p><p>Settlement Amount = Registered promotional price × Actual sales volume during the event period</p><p>*SHEIN will settle marketing fees based on your submitted promotional price and actual sales volume during the event (all sales during the price validity period are included).</p><p><br></p><p>b) Settlement Method:</p><p>Customized settlement plans are based on an affiliation model.</p><p>*Official compensation statement issued by SHEIN is final.</p>",
    "storeRequirementList": [
      {
        "requirementKey": "Store Violations",
        "requirementDesc": "Store must not be restricted from marketing due to violations",
        "isMeetRequirement": 1
      }
    ],
    "goodsRequirementSetList": [
      {
        "ruleSetId": "1058507",
        "requirementList": [
          {
            "requirementKey": "Inventory Type",
            "requirementDesc": "要求不为Inventory Type",
            "isMeetRequirement": 1
          },
          {
            "requirementKey": "Pricing",
            "requirementDesc": "Product price must not be too high",
            "isMeetRequirement": 1
          },
          {
            "requirementKey": "Product Violation",
            "requirementDesc": "Product has no violations",
            "isMeetRequirement": 1
          },
          {
            "requirementKey": "Product on sale",
            "requirementDesc": "The product needs to be on sale.",
            "isMeetRequirement": 1
          },
          {
            "requirementKey": "Product Quality",
            "requirementDesc": "Product quality must not be poor",
            "isMeetRequirement": 1
          },
          {
            "requirementKey": "Sensitive Category",
            "requirementDesc": "Product category must not be sensitive",
            "isMeetRequirement": 1
          },
          {
            "requirementKey": "Designated Products",
            "requirementDesc": "Specific products are invited to register for this campaign.",
            "isMeetRequirement": 1
          }
        ]
      }
    ],
    "partakeFieldList": [
      1
    ],
    "adjustForm": 6,
    "partakeScope": 1,
    "benefitImage": "https://img.ltwebstatic.com/v4/j/aoc/2026/02/02/cc/17700256179c44767428eafb8d33f4744834de9ba6.jpg",
    "lockInfo": "",
    "sellPriceSiteInfoList": [
      {
        "site": "shein-br",
        "currency": "BRL"
      }
    ],
    "canPartake": 1,
    "siteList": [
      "shein-br"
    ],
    "supportSelectSitePartake": 0
  },
  "traceId": "34bec1e62e90b36f"
}
```

&lt;/details>

## 其他场景示例

### 供货价商家（半托管、全托管模式）

```json
{
  "msg": "OK",
  "code": "0",
  "bbl": null,
  "info": {
    "activityId": "33707",
    "activityName": "【SHEIN全球大促】2026年「音乐节/婚礼季」 定向邀约-官方补贴活动",
    "activityType": "3",
    "partakeStartTime": "1770220800000",
    "partakeEndTime": "1772697599000",
    "activityStartTime": "1774195200000",
    "activityEndTime": "1775491199000",
    "goodsRequirementSetList": [
      {
        "requirementList": [
          {
            "requirementKey": "Designated Products",
            "requirementDesc": "Specific products are invited to register for this campaign.",
            "isMeetRequirement": 1
          }
        ]
      }
    ],
    "partakeFieldList": [
      1
    ],
    "adjustForm": 1,
    "partakeScope": 1,
    "benefitImage": "https://img.ltwebstatic.com/v4/j/aoc/2026/02/02/82/17700244569182913dea07e6667dcd866cb60da95c.jpg",
    "lockInfo": "",
    "supplyPriceCurrency": "CNY",
    "canPartake": 1,
    "siteList": [
      "shein-br",
      "shein-ca",
      "shein-de",
      "shein-es",
      "shein-fr",
      "shein-it",
      "shein-mx",
      "shein-my",
      "shein-ph",
      "shein-pl",
      "shein-pt",
      "shein-sg",
      "shein-th",
      "shein-uk",
      "shein-us",
      "shein-vn"
    ],
    "supportSelectSitePartake": 0
  },
  "traceId": "c4b2bcb352d47af3"
}
```

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002006。