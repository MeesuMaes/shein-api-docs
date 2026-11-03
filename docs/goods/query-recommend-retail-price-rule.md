# 查询建议零售价填写规则

`POST /open-api/goods/query-recommend-retail-price-rule`

**合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v6 ｜ **更新时间**：2026-09-14 17:12:46 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002033](https://open.sheincorp.com/documents/apidoc/detail/3002033)

## 接口说明

商品建议零售价填写规则（SKU维度），使用前请查看说明文档： https://open.sheincorp.com/documents/system/bf5a59ca-d378-4417-a359-f07cc89bf96b

## 请求头

- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **language** `string` — 响应msg的语种。不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **brand_code** `string` — 品牌code，例如“2xyz2”，可通过接口获取/open-api/goods/query-brand-list。 如果商品有传品牌，则必须入参品牌code获取规则。有品牌、无品牌，两种情况下的填写规则差异很大。

## 响应参数

- **code** `string` — 成功时“0” 例: `0`
- **msg** `string` — 成功时“OK” 例: `OK`
- **info** `object` **必填** — 信息
  - **data** `object` **必填** — 规则详情
    - **is_rrp_required** `integer` — SKU维度建议零售价是否必填，0-非必填，1-必填 例: `1`
    - **site_filling_rule** `integer` — 是否允许按分站点维度填写，1-允许，0-不允许 例: `1`
    - **available_sites** `object[]` **必填** — 分站点维度规则下，可填写的站点与币种列表。仅在site_filling_rule=1的时候，此字段才会有值。
      - **site** `string` — 站点名，例如shein-fr 例: `shein-de`
      - **currency** `string` — 站点币种，例如EUR 例: `EUR`
      - **material_requirement** `integer` — 站点对辅助材料类型的要求，0-不需要填材料，1-类型一材料必填（文件必填，链接选填）、类型二材料选填（文件、链接均选填），2-类型一 或 类型二，至少填写一种（不论选哪一种类型，里面的文件、链接至少给一个），3-所有类型均选填 例: `2`
    - **non_site_filling_rule** `integer` — 不分站点填写规则，1-可填，0-不可填 例: `1`
    - **non_site_currencies** `string[]` — 不分站点的规则下，可填写的币种列表。仅在non_site_filling_rule=1的时候，此字段才会有值。 例: `USD`
- **traceId** `string` — 追踪码 例: `38d84125d30c03e0`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods/query-suggested-retail-price-rule' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test \
--header 'x-lt-timestamp: 1779343461097' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{

            "brand_code":"2je8y"

}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "data": {
      "available_sites": [
        {
          "site": "shein-de",
          "currency": "EUR",
          "material_requirement": 2
        },
        {
          "site": "shein-fr",
          "currency": "EUR",
          "material_requirement": 2
        },
        {
          "site": "shein-it",
          "currency": "EUR",
          "material_requirement": 2
        },
        {
          "site": "shein-uk",
          "currency": "GBP",
          "material_requirement": 2
        },
        {
          "site": "shein-us",
          "currency": "USD",
          "material_requirement": 0
        }
      ],
      "is_rrp_required": 1,
      "site_filling_rule": 1,
      "non_site_currencies": [
        "USD",
        "CNY",
        "EUR",
        "SAR",
        "AED",
        "CAD",
        "MXN",
        "HKD",
        "VND",
        "THB",
        "GBP",
        "INR",
        "BRL",
        "TRY",
        "NZD",
        "JPY",
        "KRW"
      ],
      "non_site_filling_rule": 1
    }
  },
  "bbl": null,
  "traceId": "38d84125d30c03e0"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002033。