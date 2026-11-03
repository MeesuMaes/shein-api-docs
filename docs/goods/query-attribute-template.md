# 查询分类可用属性

`POST /open-api/goods/query-attribute-template`

**QPS**：80 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v32 ｜ **更新时间**：2026-10-09 11:18:49 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002046](https://open.sheincorp.com/documents/apidoc/detail/3002046)

## 接口说明

支持查询店铺可用属性。平台内不同店铺在各个类目下可用的属性不同，因此建议按店铺维度更新数据。同时因平台规则可能会变更，如增加销售属性，修改属性是否必填等，建议一周更新一次。
属性包括：商品属性、主销售属性（skc）、次销售属性（sku）、尺码表属性，属性规则复杂，可查看SHEIN商品属性介绍了解详细对接方式。

## 请求头

- **language** `string` **必填** — 默认返回中文多语言信息，支持语种：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **product_type_id_list** `int64[]` **必填** — 类型id集合，单次调用最多支持10个类型id

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
- **code** `string` **必填** — Result(success: 0)
- **info** `object`
  - **data** `object[]`
    - **attribute_infos** `object[]` — 某个product_type下属性列表。 建议查看SHEIN商品属性介绍了解更多对接细节。
      - **attribute_id** `long` — 属性id
      - **attribute_name** `string` — 属性id的名称。常见的销售属性有颜色、尺码；常见的商品属性有产品特征、产品功能、是否需要电源等
      - **attribute_is_show** `int64` — 属性是否会在消费者端显示；1-展示，2-不展示
      - **attribute_type** `int64` — 属性类型。决定属性在商品发布接口中哪个字段内入参。 1-销售属性（在skc_list和sku_list入参）；2-尺寸属性（在size_attribute_list传参），3-成分属性（需要同时结合data_dimension的值，判断在发品接口的入参字段），4-普通属性（需要同时结合data_dimension的值，判断在发品接口的入参字段）
      - **attribute_label** `int64` — 主销售属性（SKC属性标签）。只有主销售属性才可在skc_list中传参。 1-代表是主销售属性，主销售属性也可用于次销售属性; 0: 不是主销售属性。
      - **attribute_mode** `int64` — 属性值的录入方式。 0 - 手工输入属性值，常见于尺寸属性，只可输入正整数，需在attribute_extra_value中入参； 1-下拉多选，即属性下可以有多个属性值，需在attribute_value_id中入参； 2-销售属性专用，下拉单选，需在attribute_value_id中入参； 3-下拉单选，需在attribute_value_id中入参 4-下拉多选+手工输入参数，需在attribute_value_id和attribute_extra_value中入参
      - **attribute_input_num** `integer` — 属性值个数限制。 当attribute_mode=1时，最多可选的属性值个数，0代表无限制。
      - **attribute_status** `int64` — 属性是否必填。 1-不可填写（属性可能已废弃）；2-选填；3-必填。必填属性如果不填，则会报错；
      - **attribute_remark_list** `integer[]` — 属性标识。说明属性归属于什么场景。1:重要,2:合规,3:质量,4:关务
      - **data_dimension** `integer` — 商品属性的绑定维度（attribute_type=3/4）。 1-skc维度，在发品接口的product_attribute_list中入参 3-sku维度，在发品接口的sku_scope_attribute_list中入参
      - **attribute_value_info_list** `object[]` — 属性值列表
        - **attribute_value** `string` — 属性值的具体内容
        - **attribute_value_id** `long` — 属性值id
        - **is_show** `int64` — 是否展示
        - **is_custom_attribute_value** `boolean` — 是否为自定义属性值。true代表是，false代表否
      - **rule_info_list** `object[]` — 成分属性或普通属性（attribute_type=3/4）支持手动输入值时（attribute_mode=0/4，即可在发品接口中的product_attribute_list-attribute_extra_value中入参时）需要关注此规则。此字段中给出了手动输入值的填写规则。
        - **condition_operator** `integer` — 条件运算符(目前只作用于正整数、自然数的位数控制)； 0、空：表示不做控制，1：大于\{value\}位，2：小于\{value\}位
        - **condition_type** `integer` — 校验规则类型。 1-值必须是正整数 2-值必须是连接符，可填符号的详见value 3-值允许输入小数，小数最多支持的位数见value 4-值必须是自然数 (0+正整数) 5-允许输入数字和连接符，数字最多允许2位小数，可填写的连接符见value，多个时逗号分隔，如-,~,/
        - **id** `int64` — 校验规则id
        - **value** `string` — 变量值。不同condition_type时代表意义不同，详细说明见condition_type
      - **supplier_id** `long` — 商家id（如果值大于0，则表示是自定义属性）
    - **main_attribute_status** `long` — 类目下主销售属性填写要求。注意：API发品时不论哪种情况，skc的主销售属性必须入参，只是不同填写要求主销售属性可用值不同。 1-不填：主销售属性必须使用【默认】属性。 2-选填：主销售属性可使用【默认】或其他属性。 3-必填：主销售属性不可以使用【默认】属性，只能用其他属性。
    - **product_type_id** `long` — 商品类型id
  - **meta** `object`
    - **count** `integer`
    - **customObj** `object`
- **msg** `string` — Error description, success: OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/query-attribute-template' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "product_type_id_list": [
        2147503175
    ]
}'
```

### 响应示例

```text
{
    "code": "0",
    "msg": "OK",
    "info": {
        "data": [
            {
                "product_type_id": 2512,
                "business_mode": 1,
                "attribute_infos": [
                    {
                        "attribute_id": 87,
                        "attribute_name": "尺寸",
                        "attribute_name_en": "Size",
                        "attribute_is_show": 1,
                        "attribute_source": 1,
                        "attribute_label": 0,
                        "attribute_mode": 2,
                        "data_dimension": 1,
                        "attribute_status": 3,
                        "attribute_type": 1,
                        "business_mode": 1,
                        "is_sample": 1,
                        "supplier_id": 0,
                        "attribute_doc": null,
                        "attribute_doc_image_list": null,
                        "attribute_value_info_list": [
                            {
                                "attribute_value_id": 474,
                                "attribute_value": "单一尺寸",
                                "attribute_value_en": "one-size",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1448,
                                "attribute_value": "",
                                "attribute_value_en": "",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 568,
                                "attribute_value": "S",
                                "attribute_value_en": "S",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 417,
                                "attribute_value": "M(中文)",
                                "attribute_value_en": "M",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 387,
                                "attribute_value": "L-中文",
                                "attribute_value_en": "L",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 754,
                                "attribute_value": "XL中文",
                                "attribute_value_en": "XL_en",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 756,
                                "attribute_value": "XXL",
                                "attribute_value_en": "XXL",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 758,
                                "attribute_value": "XXXL",
                                "attribute_value_en": "XXXL",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 759,
                                "attribute_value": "XXXXL",
                                "attribute_value_en": "XXXXL",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            }
                        ]
                    },
                    {
                        "attribute_id": 27,
                        "attribute_name": "颜色",
                        "attribute_name_en": "color",
                        "attribute_is_show": 1,
                        "attribute_source": 1,
                        "attribute_label": 1,
                        "attribute_mode": 2,
                        "data_dimension": 1,
                        "attribute_status": 3,
                        "attribute_type": 1,
                        "business_mode": 1,
                        "is_sample": 0,
                        "supplier_id": 0,
                        "attribute_doc": null,
                        "attribute_doc_image_list": null,
                        "attribute_value_info_list": [
                            {
                                "attribute_value_id": 78,
                                "attribute_value": "杏色",
                                "attribute_value_en": "Apricot",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 81,
                                "attribute_value": "军绿色",
                                "attribute_value_en": "Army Green",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 103,
                                "attribute_value": "米色",
                                "attribute_value_en": "Beige",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 112,
                                "attribute_value": "黑色",
                                "attribute_value_en": "Black",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 113,
                                "attribute_value": "黑白色",
                                "attribute_value_en": "Black and White",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 118,
                                "attribute_value": "blackk",
                                "attribute_value_en": "blackk",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 137,
                                "attribute_value": "青铜色",
                                "attribute_value_en": "Bronze",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 140,
                                "attribute_value": "棕色",
                                "attribute_value_en": "Brown",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 144,
                                "attribute_value": "酒红色",
                                "attribute_value_en": "Burgundy",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 152,
                                "attribute_value": "驼色",
                                "attribute_value_en": "Camel",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 171,
                                "attribute_value": "香槟色",
                                "attribute_value_en": "Champagne",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 182,
                                "attribute_value": "明亮",
                                "attribute_value_en": "Clear",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 322,
                                "attribute_value": "姜黄色",
                                "attribute_value_en": "Ginger",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 330,
                                "attribute_value": "金黄",
                                "attribute_value_en": "Gold",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 334,
                                "attribute_value": "绿色",
                                "attribute_value_en": "Green",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 336,
                                "attribute_value": "灰色",
                                "attribute_value_en": "Grey",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 364,
                                "attribute_value": "玫红色",
                                "attribute_value_en": "Hot Pink",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 379,
                                "attribute_value": "黄褐",
                                "attribute_value_en": "Khaki",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 421,
                                "attribute_value": "紫红色",
                                "attribute_value_en": "Maroon",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 447,
                                "attribute_value": "彩色",
                                "attribute_value_en": "Multicolor",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 475,
                                "attribute_value": "橘色",
                                "attribute_value_en": "Orange",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 513,
                                "attribute_value": "粉色",
                                "attribute_value_en": "Pink",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 536,
                                "attribute_value": "紫色",
                                "attribute_value_en": "Purple",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 544,
                                "attribute_value": "红色",
                                "attribute_value_en": "Red",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 562,
                                "attribute_value": "宝蓝色",
                                "attribute_value_en": "Royal Blue",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 601,
                                "attribute_value": "银色",
                                "attribute_value_en": "Silver",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 739,
                                "attribute_value": "白色",
                                "attribute_value_en": "Whiteen",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 762,
                                "attribute_value": "黄色",
                                "attribute_value_en": "Yellow",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 2427,
                                "attribute_value": "",
                                "attribute_value_en": "",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 2431,
                                "attribute_value": "",
                                "attribute_value_en": "",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 2436,
                                "attribute_value": "Mint Green",
                                "attribute_value_en": "Mint Green",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 2486,
                                "attribute_value": "Light Grey",
                                "attribute_value_en": "Light Grey",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 2493,
                                "attribute_value": "Dark Grey",
                                "attribute_value_en": "Dark Grey",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 2566,
                                "attribute_value": "frankie_test",
                                "attribute_value_en": "frankie_test",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000107,
                                "attribute_value": "秋",
                                "attribute_value_en": "秋",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000108,
                                "attribute_value": "冬",
                                "attribute_value_en": "冬",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000109,
                                "attribute_value": "流行款",
                                "attribute_value_en": "DYJ_流行款_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000110,
                                "attribute_value": "时尚款",
                                "attribute_value_en": "DYJ_时尚款_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000111,
                                "attribute_value": "复色款",
                                "attribute_value_en": "DYJ_复色款_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000112,
                                "attribute_value": "DYJ_新款",
                                "attribute_value_en": "DYJ_新款",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000113,
                                "attribute_value": "DYJ_套用版型款",
                                "attribute_value_en": "DYJ_套用版型款",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000114,
                                "attribute_value": "DYJ_针织",
                                "attribute_value_en": "DYJ_针织",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000115,
                                "attribute_value": "梭织",
                                "attribute_value_en": "DYJ_梭织_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000116,
                                "attribute_value": "DYJ_毛织",
                                "attribute_value_en": "DYJ_毛织_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000117,
                                "attribute_value": "pink",
                                "attribute_value_en": "pink",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000118,
                                "attribute_value": "BLUE",
                                "attribute_value_en": "BLUE",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000119,
                                "attribute_value": "修身",
                                "attribute_value_en": "DYJ_修身_en",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000120,
                                "attribute_value": "宽松",
                                "attribute_value_en": "DYJ_宽松_en",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000121,
                                "attribute_value": "紧身",
                                "attribute_value_en": "DYJ_紧身_en",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000123,
                                "attribute_value": "DYJ_H",
                                "attribute_value_en": "DYJ_H_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000126,
                                "attribute_value": "DYJ_棒球领",
                                "attribute_value_en": "DYJ_棒球领_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000127,
                                "attribute_value": "DYJ_翻领",
                                "attribute_value_en": "DYJ_翻领_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000128,
                                "attribute_value": "DYJ_泡泡袖",
                                "attribute_value_en": "DYJ_泡泡袖_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000129,
                                "attribute_value": "DYJ_蝙蝠袖",
                                "attribute_value_en": "DYJ_蝙蝠袖_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000130,
                                "attribute_value": "DYJ_踩脚裤",
                                "attribute_value_en": "DYJ_踩脚裤_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000131,
                                "attribute_value": "DYJ_阔腿裤",
                                "attribute_value_en": "DYJ_阔腿裤_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000132,
                                "attribute_value": "DYJ_泡泡裙",
                                "attribute_value_en": "DYJ_泡泡裙_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000133,
                                "attribute_value": "DYJ_鱼尾裙",
                                "attribute_value_en": "DYJ_鱼尾裙_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000134,
                                "attribute_value": "DYJ_超短款",
                                "attribute_value_en": "DYJ_超短款_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000135,
                                "attribute_value": "DYJ_常规款",
                                "attribute_value_en": "DYJ_常规款",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            },
                            {
                                "attribute_value_id": 1000136,
                                "attribute_value": "DYJ_超长袖",
                                "attribute_value_en": "DYJ_超长袖_EN",
                                "is_custom_attribute_value": false,
                                "is_show": 1,
                                "supplier_id": 0,
                                "attribute_value_doc": null,
                                "attribute_value_doc_image_list": null,
                                "attribute_value_group_list": null
                            }
                        ]
                    },
                ],
                "attribute_id": [
                    87,
                    27,
                    109,
                    160,
                    1000547,
                    62,
                    55,
                    118,
                    48,
                    32,
                    1000411,
                    1000463,
                    1000186,
                    1000462,
                    1000407,
                    1000546,
                    1000576,
                    1000062
                ]
            }
        ],
        "meta": {
            "count": 1,
            "customObj": null
        }
    },
    "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002046。