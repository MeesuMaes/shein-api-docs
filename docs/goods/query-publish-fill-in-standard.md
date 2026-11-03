# 商品发布字段规范

`POST /open-api/goods/query-publish-fill-in-standard`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v47 ｜ **更新时间**：2026-11-03 10:23:17 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002044](https://open.sheincorp.com/documents/apidoc/detail/3002044)

## 接口说明

每个店铺在各个分类下有不同的商品发布字段填写规范（要求）。建议在调用商品发布接口前，先调用此接口。本接口可查询的要求范围包括：
1、商品标题和商品描述的必填默认语种（default_language）
2、商品发布时是否必传竞品链接和库存证明（reference_product_link和proof_of_stock）
3、商品发布时是否必传样品信息（sample_info）
4、商品发布时是否必传品牌（brand_code）
5、商品发布时是否必传skc标题（skc_title）
6、半托管和全托管的供货价币种（currency）
7、商品是否支持sku和spu维度的图片（picture_config_list）
8、商品发布时是否必传最小备货数量（minimum_stock_quantity）
9、商品是否支持上传详情图（product_detail_picture）
10、商品是否支持在SKU维度传件数（quantity_info)
11、商品是否支持传SKC建议零售价（suggest_price）
12、商品是否支持填写商家条码（supplier_barcode）
13、商品是否支持填写SKU包装类型（package_type）
14、商品是否支持上传IP信息（ip_character）
15、是否支持上传视频（product_video）

## 请求头

- **language** `string` **必填** — 支持返回的多语言报错信息，可用的语种：简体中文：zh-cn、英语：en、西班牙语：es、法语：fr、德语：de、意大利语：it、巴西葡萄牙语：pt-BR、葡萄牙葡萄牙语：pt-PT、波兰语：pl、土耳其语：tr、阿拉伯语：ar、韩语：ko、日语：ja、瑞典语：sv
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **category_id** `long` — 末级分类id。查询以下信息的填写规范时需要入参末级分类ID: 分类是否支持SPU维度图片、样品信息、SKU包装类型、SKU维度件数、站点详情图、标题默认语种的最大字符数、分类下SKU图是否必传
- **spu_name** `string` — SHEIN生成的SKC编码。 该入参仅用于查询某个SPU当前是否正在使用图片新方案，其它场景不需要传；使用场景较少。

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — result(success: 0)
- **info** `object`
  - **fill_in_standard_list** `object[]` **必填** — 商品发布接口中字段的填写规范列表。 每个field_key值会对应发布接口中的一个入参字段，可确认某个入参能否传值、是否必传。
    - **field_key** `string` **必填** — 规范内容。以下是此接口枚举值 - 对应的发布接口入参字段名，字段较多请点击FAQ查看
    - **module** `string` **必填** — 该模块是对应shein后台发品页面的模块，对应以下模块: 1、基本信息 2、供应信息 3、参考信息 4、样品信息
    - **required** `boolean` **必填** — field key中内容是否必填。 true-必填，false非必填
    - **show** `boolean` **必填** — field key中内容是否可传（即是否会展示在商家后台让商家填写）。 true可传，false不可传（传了可能会被拦截，也可能传的数据会被系统自动忽略清除）。
  - **currency** `string` **必填** — 商品供货价币种。 半托管和全托管使用，在发布接口的cost_info -> currency 中使用。
  - **default_language** `string` **必填** — 商家的默认语言。 在发布接口的multi_language_desc_list、multi_language_name_list中使用。默认语种的商品名称必填，
  - **default_language_title_max_length** `integer` — 商品标题的默认语种的最大字符数。 平台从26年6月开始对默认语种字符数进行管控，不同商品分类+语种，默认语种的字符数限制不同。请入参category_id后获取最大字符数。
  - **language_title_max_length_list** `object[]` — 商品标题的所有语种的字符数限制（含默认语种）
    - **language** `string` — 语种
    - **max_length** `double` — 语种的最大字符数（含空格）
  - **picture_config_list** `object[]` — 查询店铺是否支持SPU、SKC、SKU维度上传图片
    - **field_key** `string` — 字段Code
    - **is_true** `boolean` — 枚举：是/否
  - **support_sale_attribute_sort** `boolean` — 该字段判断是否支持次销售属性值排序；主销售属性值默认都支持排序
  - **support_duplicate_sale_attr_value** `boolean` — 判断主销售属性的属性（即SKC的属性值）值是否允许重复。 true=可重复，例如skc1：颜色-红色，skc2：颜色-红色 false=不可重复。
  - **supplier_code_in_spu_dimension** `boolean` — 判断supplier_code是否绑定在SPU维度。 true=spu维度，发品接口中货号入参到最外层的supplier_code false=skc维度，发品接口中货号入参到skc_list下的supplier_code
- **msg** `string` — 错误描述， success: OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/query-publish-fill-in-standard' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw ''
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "fill_in_standard_list": [
      {
        "module": "reference_info",
        "field_key": "reference_product_link",
        "required": false,
        "show": false
      },
      {
        "module": "reference_info",
        "field_key": "proof_of_stock",
        "required": false,
        "show": false
      },
      {
        "module": "basic_info",
        "field_key": "skc_title",
        "required": false,
        "show": true
      },
      {
        "module": "supplier_info",
        "field_key": "minimum_stock_quantity",
        "required": false,
        "show": false
      },
      {
        "module": "sales_info",
        "field_key": "shelf_require",
        "required": false,
        "show": false
      },
      {
        "module": "basic_info",
        "field_key": "brand_code",
        "required": true,
        "show": true
      }
    ],
    "default_language": "en",
    "picture_config_list": [],
    "currency": "GBP",
    "support_sale_attribute_sort": null
  },
  "bbl": null,
  "traceId": "19291dc98a3812a8"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002091。