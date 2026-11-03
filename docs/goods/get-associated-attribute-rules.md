# 查询关联属性填写规则

`POST /open-api/goods/get-associated-attribute-rules`

**QPS**：60 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v6 ｜ **更新时间**：2026-04-21 17:39:13 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001680](https://open.sheincorp.com/documents/apidoc/detail/3001680)

## 接口说明

发布或编辑商品时，某个商品属性（attribute_type=3/4）或尺码属性（attribute_type=2）是否必填有两层规则：基础规则、关联规则。
基础规则：通过/open-api/goods/query-attribute-template获取，attribute_status=3代表属性必填。
关联规则：在基础规则上，部分非必填属性因业务要求也会变成必填。
规则1：选择A属性的A1属性值，导致B属性必填（B属性原本可能是非必填）
规则2：选择A属性的A1属性值、B属性的B1属性值，导致C属性必填，且可能存在必填属性值C1、C2、C3范围（C属性原本可能是非必填）
此接口可查询关联规则，建议在商品发布之前调用，将填写的所有商品属性&属性值作为入参，查看是否存在需要填写的关联属性。（不要输入销售、尺码属性）

## 请求头

- **Content-Type** `string` **必填** — application/json 例: `application/json`
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **language** `string` — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **get_linked_rule_req_list** `object[]` **必填** — 输入所有已填写的商品属性（不要给销售、尺码属性），接口会返回这些属性组合情况下，会有哪些关联属性必填。 支持同时查询多个商品的关联属性规则，每个商品信息记为一组，例如同时查询商品A、商品B的关联规则，则A的信息作为group1，B的信息作为group2查询。
  - **group_id** `string` — 组别id，开发者自定义值即可，批量查询商品时用于定位，单次请求最多支持10个group。
  - **category_id** `int64` **必填** — 商品末级分类id
  - **product_type_id** `int64` **必填** — 商品末级分类对应的类型id
  - **attribute_list** `object[]` **必填** — 已填写的商品属性列表。列表内可填写的attribute_id数量没有限制。
    - **attribute_id** `int64` **必填** — 属性名id
    - **attribute_value_id** `int64` — 属性值id；如果属性名下都多个属性值，需提供多组信息。 当属性值的输入方式attribute_mode=4（下拉选择+手动输入）时，将下拉选择的value id入参至此处，手动输入的attribute_extra_value不用录入

## 响应参数

- **code** `string` **必填** — 响应码。响应正常为0。 例: `0`
- **msg** `string` **必填** — 响应信息。响应正常为OK。 例: `OK`
- **info** `object` **必填** — 响应详情
  - **data** `object[]` **必填** — 规则信息
    - **group_id** `string` — 组别id。内容和入参时保持一致。
    - **link_rule_attribute_list** `object[]` — 关联属性必填规则。 此对象下若无值，则代表没有必填的关联属性。若有值，则所有的attribute_id都是必填。若attribute_value_list或attribute_value_pre_fill_list有值，则代表必须在2个list的合集范围内选择属性值。 结果中出现入参中填入的attribute_id是正常现象。
      - **attribute_id** `int64` — 属性名id。 可能会出现商品属性或尺码属性。 例: `2147484188`
      - **attribute_value_list** `int64[]` — 属性值id；若此字段有值（可能1个或多个），代表必须在list范围内选择属性值。若无值，代表属性值没有范围要求。 此列表和attribute_value_pre_fill_list里都可能会有值，需要取两者的合集。 例: `154`
      - **attribute_value_pre_fill_list** `int64[]` — 属性值id；若此字段有值（可能1个或多个），代表必须在list范围内选择属性值。若无值，代表属性值没有范围要求。 此列表和attribute_value_list里都可能会有值，需要取两者的合集。
  - **meta** `object` **必填** — 数据统计
    - **count** `integer` — count对象为group_id 例: `2`
- **traceId** `string` **必填** — 请求追踪码 例: `33e8e19e6fc2ae68`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/get-associated-attribute-rules' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1753682806205' \
--header 'language: en' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
   "get_linked_rule_req_list":[
    {
        
        "group_id":1,
        "category_id": 20039919,
        "product_type_id": 2147503231,
        "attribute_list":[
            {
                "attribute_id":2147484223,
                "attribute_value_id":2147488193
            },
            {
                "attribute_id":2147484194,
                "attribute_value_id":7627286
            },
            {
                "attribute_id": 2147484194,
                "attribute_value_id":7627280
            }
        ]
    },
     {
        
        "group_id":2,
        "category_id": 20039919,
        "product_type_id": 2147503231,
        "attribute_list":[
            {
                "attribute_id":2147484223,
                "attribute_value_id":21474881945
            },
            {
                "attribute_id":2147484194,
                "attribute_value_id":762725546
            },
            {
                "attribute_id": 21474841954,
                "attribute_value_id":762280
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
    "data": [
      {
        "group_id": "1",
        "link_rule_attribute_list": [
          {
            "attribute_id": 2147484196,
            "attribute_value_list": [
              440,
              442
            ],
            "attribute_value_pre_fill_list": []
          },
          {
            "attribute_id": 2147484188,
            "attribute_value_list": [
              290,
              372,
              325,
              327,
              62,
              154,
              91
            ],
            "attribute_value_pre_fill_list": [
              154,
              91
            ]
          }
        ]
      },
      {
        "group_id": "2",
        "link_rule_attribute_list": [
          {
            "attribute_id": 2147484196,
            "attribute_value_list": [
              440,
              442
            ],
            "attribute_value_pre_fill_list": []
          },
          {
            "attribute_id": 2147484188,
            "attribute_value_list": [
              290,
              372,
              325,
              327,
              62,
              154,
              91
            ],
            "attribute_value_pre_fill_list": [
              154,
              91
            ]
          }
        ]
      }
    ],
    "meta": {
      "count": 2,
      "customObj": null
    }
  },
  "bbl": null,
  "traceId": "55d05009ca82c48f"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001680。