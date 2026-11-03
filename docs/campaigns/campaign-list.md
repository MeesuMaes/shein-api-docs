# 查询可报活动列表

`POST /open-api/campaigns/campaign-list`

**QPS**：15 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v8 ｜ **更新时间**：2026-08-27 10:30:03 ｜ **所属权限包**：[营销活动报名](/packages/campaign) ｜ **官方文档**：[3001993](https://open.sheincorp.com/documents/apidoc/detail/3001993)

## 接口说明

通过该接口获取商家能够报名的所有营销活动，支持对活动类型进行筛选。

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
- **activityTypeList** `integer[]` — 活动类型（1：频道； 2：清仓； 3：大促；4：日常）

## 响应参数

- **msg** `string` — 错误描述，成功：OK
- **code** `string` — 响应编码，成功：0
- **info** `object` **必填** — 响应数据
  - **count** `integer` **必填** — 查询结果条数
  - **activityList** `object[]` — 活动列表信息
    - **activityId** `integer` — 活动ID
    - **activityName** `string` — 活动名称
    - **activityType** `integer` — 活动类型（1：频道； 2：清仓； 3：大促；4：日常）
    - **partakeStartTime** `integer` — 报名开始时间。时间戳，单位毫秒。
    - **partakeEndTime** `integer` — 报名结束时间。时间戳，单位毫秒。
    - **activityStartTime** `integer` — 活动开始时间。时间戳，单位毫秒。
    - **activityEndTime** `integer` — 活动结束时间。时间戳，单位毫秒。
- **traceId** `string` — 请求的唯一标识，用于异常报错跟踪。

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/campaigns/campaign-list' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1772085367565' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--data-raw '{
  "pageNum": 1,
  "pageSize": 3,
  "activityTypeList": [
    1, 2, 3, 4
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
    "count": 5,
    "activityList": [
      {
        "activityId": "34387",
        "activityName": "BR 2026_Consumer Week",
        "activityType": "4",
        "partakeStartTime": "1771848000000",
        "partakeEndTime": "1772938799000",
        "activityStartTime": "1772438400000",
        "activityEndTime": "1773647999000"
      },
      {
        "activityId": "33710",
        "activityName": "[GLOBAL SALE]  \"SHEIN 2026 Music Festival / Wedding Season\": Regular Promotion – Self-Operated and Self-Pricing Sellers - VIP Tier Registration",
        "activityType": "3",
        "partakeStartTime": "1770220800000",
        "partakeEndTime": "1772697599000",
        "activityStartTime": "1774195200000",
        "activityEndTime": "1775491199000"
      },
      {
        "activityId": "33711",
        "activityName": "[GLOBAL SALE]  \"SHEIN 2026 Music Festival / Wedding Season\": Regular Promotion - Self-Operated and Self-Pricing Sellers - Standard Tier Registration",
        "activityType": "3",
        "partakeStartTime": "1770220800000",
        "partakeEndTime": "1772697599000",
        "activityStartTime": "1774195200000",
        "activityEndTime": "1775491199000"
      }
    ]
  },
  "traceId": "47fb4168abce0e5e"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001993。