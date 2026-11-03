# 商品部分编辑

`POST /open-api/goods/product/partialEdit`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v12 ｜ **更新时间**：2026-11-03 10:19:06 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002047](https://open.sheincorp.com/documents/apidoc/detail/3002047)

## 接口说明

此接口用于编辑已审核通过的商品，支持简化入参实现编辑，提交后商品需要接受平台审核
支持的场景（以下场景可在一次请求中叠加出现）：
1、编辑商品的信息：修改A信息，就只需要传A信息。例如修改某个SKU的supplier_sku，则提供"spu_name + skc_name + sku_code + supplier_sku"即可
2、SPU下新增SKC：可以只传新SKC的信息，提供"spu_name + 新skc的完整skc_list"即可。
3、SPU下新增SKU：可以只传新SKU的信息，提供"spu_name + skc +新sku的完整sku_list"即可。
调用注意事项
1、收到请求后平台会补齐未入参字段后进行商品发布校验，因此编辑时，依旧要确保商品整体数据符合平台要求。例如：编辑时若分类新增必填属性，则需要提供新必填属性；编辑时若某个SKU增加SKU图，则SKC下其他所有SKU也需提交SKU图。
2、此接口调用原则是，某字段不传或传null=字段不更新保留原值，某字段传值=更新为入参值，某字段传""=将字段的值更新为空。
3、编辑商品的信息时，编辑SPU/SKC/SKU下某个信息时，若编辑的字段是object[]，则需要提供字段下完整数据，例如：product_attribute_list中原本有4个属性，需要更新任意信息时，入参需提供"更新后完整的商品属性"。
响应说明
1、修改SPU层级数据时，实际会修改所有SKC相关数据（可理解为所有SKC共享SPU层数据），因此响应用会返回所有SKC的审核公文
2、修改SKC-A 或 SKC-A下的SKU1 或 SKC-A下新增SKU时，响应中会返回SKC-A的审核公文
3、新增SKC-B时，响应中会返回SKC-B的审核公文

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` **必填** — 支持返回的多语言报错信息，可用的语种：简体中文：zh-cn、英语：en、西班牙语：es、法语：fr、德语：de、意大利语：it、巴西葡萄牙语：pt-BR、葡萄牙葡萄牙语：pt-PT、波兰语：pl、土耳其语：tr、阿拉伯语：ar、韩语：ko、日语：ja、瑞典语：sv

## 请求参数

- **spu_name** `string` **必填** — 平台生成的SPU唯一编码。必填。 例: `random_spu_name`
- **category_id** `int64` — 末级分类id。 例: `13`
- **product_type_id** `int64` — 商品类型id。 例: `4`
- **supplier_code** `string` — 商家货号，到主规格粒度，最多200个字符 例: `random_supplier_code`
- **brand_code** `string` — 店铺可用的品牌code。 例: `random_brand_code`
- **ip_character_list** `object[]` — 商品IP。目前每个商品仅支持绑定1个IP。 店铺可用的IP可通过接口获取：/open-api/goods/query-ip-list。店铺能否传IP，需通过规范接口确认，"ip_character"的"show": true代表可传。
  - **ip_id** `int64` — IP的ID。若传ip_character_list，则ip_id必传。
  - **ip_name** `string` — IP的英语名称
  - **ip_name_cn** `string` — IP的中文名称
- **is_spu_pic** `boolean` — 是否使用新版图片方案。true-用新方案，false-用旧方案。 如果从false切换成true，必须提交新方案中需要的所有层级的所有类型图片。 例: `false`
- **image_info** `object` — SPU图片列表。 当商品原本就可传SPU图片时才可编辑（即商品原本的is_spu_pic=true）
  - **image_group_code** `string` — 图片组的唯一编码，由平台生成。 例: `random_image_group_code`
  - **image_info_list** `object[]` **必填** — 图片明细
    - **image_item_id** `int64` — 图片的唯一编码，由平台生成。 例: `12`
    - **image_sort** `integer` — 图片排序。 同个图片组内序号值不可重复。type=1的图片sort必须是1。 例: `34`
    - **image_type** `integer` — 图片类型。1-主图,2-细节图,5-方块图,6-色块图。 需要提供哪些类型的图片、数量限制、各类型图片的尺寸要求，请参考商品图片方案了解详细信息。 例: `9`
    - **image_url** `string` — 图片链接。 必须为SHEIN格式的URL，可通过外链转换或本地图片上传获取。 例: `random_image_url`
- **multi_language_name_list** `object[]` — 商品名称列表（支持多语言） 此字段不允许清空，如果编辑时字段传“”会报错。
  - **language** `string` **必填** — 语种。 若传值则必须提供默认语种，默认语种需通过商品发布规范API获取default_language。 例: `random_language`
  - **name** `string` **必填** — 商品名称，最多1000个字符，不支持emoji。 例: `random_name`
- **multi_language_desc_list** `object[]` — 商品描述列表（支持多语言）
  - **language** `string` **必填** — 语种。 若传值则必须提供默认语种，默认语种需通过商品发布规范API获取default_language。 例: `random_language`
  - **name** `string` **必填** — 多语言描述，最多5000个字符，不支持emoji。 例: `random_name`
- **product_attribute_list** `object[]` — 商品属性列表。若更新商品属性信息，则需要提交完整的属性列表。 此列表只能入参attribute_type=3/4的属性。属性使用方式请参考商品属性文档。
  - **attribute_id** `int64` **必填** — 属性ID。 商品属性中仅可入参attribute_type=3/4的属性。 必填商品属性有2类：一是attribute_status=3的属性，通过店铺可用属性确认；二是因选了A属性导致B属性必填的关联属性，通过查询关联属性填写规则确认。 例: `6`
  - **attribute_value_id** `int64` — 属性值ID。当属性的输入方式attribute_mode=1/3/4时，需要在此处入参。 当attribute_mode=3（下拉单选）时，代表属性id下只能有1个属性值id；当attribute_mode=1（下拉多选）/4（下拉多选+手动输入）时，代表属性id下可以有N个属性值id，多选时每个属性值需要以单独一组数据形式入参，此字段不支持数组，最多可选属性值个数通过属性的attribute_input_num判断。 例: `18`
  - **attribute_extra_value** `string` — 属性值（手动输入类型）。 当属性的输入方式attribute_mode=0/4时，需要在此处入参。支持输入正整数、文字 当attribute_type=3，且attribute_mode=4（下拉多选+手动输入）时，同属性ID下多个属性值的手动输入值之和必须=100。例如成分属性，A成分含10，B成分含90。 例: `random_attribute_extra_value`
- **size_attribute_list** `object[]` — 尺码属性（尺码表）。 注意：若商品原本有尺码表，在部分编辑时商品下SKU的属性值变多时，必须同时提交新的尺码表数据。例如原本SKU是尺码-S，尺码-M，此次提交时新增了SKU尺码-L，则同时需要提交包含S、M、L的尺码表。尺码入参方式请参考商品属性文档。
  - **attribute_id** `int64` **必填** — 属性ID。 此字段只能入参attribute_type=2的属性。 例: `85`
  - **attribute_value_id** `int64` — 属性值ID。 尺码属性不需要传此值，需要在attribute_extra_value给值。 例: `73`
  - **attribute_extra_value** `string` — 属性值（手动输入类型）。 当属性的输入方式attribute_mode=0/4时，需要在此处入参。仅支持输入正整数。 例: `random_attribute_extra_value`
  - **relate_sale_attribute_id** `int64` — 关联的销售属性ID。 尺码属性可与销售属性关联，形成尺码表。注意：只能关联sku维度属性。例如尺码：尺码属性：长度，销售属性:尺寸-S，组合后才是完整尺码表。 例: `1`
  - **relate_sale_attribute_value_id** `int64` — 关联的销售属性值ID。注意：只能关联sku维度属性。 例: `58`
  - **relate_sale_attribute_value** `string` — 关联的自定义属性值。当SKU的属性值为自定义属性值时，在此处入参，内容需要和SKU属性值保持一致。如果SKU属性值中使用value形式，则此处也必须用value。 使用方式详见文档。 例: `random_relate_sale_attribute_value`
- **sale_attribute_sort_list** `object[]` — 销售属性排序。 注意：如果商品原本有自定义排序，在部分编辑时新增了SKC或SKU时，需要同时提交完整的排序值。
  - **attribute_id** `int64` **必填** — 属性名ID 例: `56`
  - **in_order_attribute_value_id_list** `int64[]` — 属性值ID排序列表。 列表内按期望顺序排列，以确保商品详情页面的顺序与传入参数中的属性值顺序一致。 例: `28`
  - **in_order_attribute_value_list** `object[]` — 排好序的属性值ID/自定义属性值备注列表。如果属性下有自定义属性值，需用这个字段，属性值用哪个形式就入参下面的哪个字段，按排序输入即可。 使用方式详见文档。
    - **attribute_value_id** `int64` — 属性值ID 例: `79`
    - **custom_attribute_value** `string` — 自定义属性值的内容。入参内容必须和销售属性中填写的属性值一模一样。 例: `random_custom_attribute_value`
- **skc_list** `object[]` — SKC信息列表。 一个spu下最多40个skc。
  - **skc_name** `string` — SKC唯一编码，由平台生成。 编辑SKC时必填。 例: `random_skc_name`
  - **sale_attribute** `object` — SKC销售属性。 此字段只能入参attribute_type=1 且 attribute_label=1的属性。存在必填的销售属性，attribute_status=3为必填属性，通过店铺可用属性确认；
    - **attribute_id** `int64` — 销售属性ID 例: `36`
    - **attribute_value_id** `int64` — 销售属性值ID 例: `7`
    - **custom_attribute_value** `string` — 自定义属性值。使用方式详见文档。 仅在销售属性ID支持自定义属性值时，才可在此字段内入参，可通过/open-api/goods/get-custom-attribute-permission-config确认。 属性值要求：字符数50以内；支持半角符号，不可输入全角符号；不支持unicode，检验表达式可参考：String emojiPattern = "[\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u2600-\\u27ff]" 例: `random_custom_attribute_value`
    - **language** `string` — 自定义属性值的语种。 支持的语种：en、zh-cn、fr、es、it。如果ERP不传多语言内容，平台会做系统翻译。 例: `random_language`
  - **skc_title** `string` — skc维度商品标题。 部分商家必填，通过商品发布规范接口确认，"field_key":"skc_title","required":"true"时必填，"show":"false"时不可传。提供默认语种的标题即可。编辑时不传字段代表清空数据。 例: `random_skc_title`
  - **skc_multi_language_name_list** `object[]` — SKC维度标题多语言列表。若入参则必须提供skc的默认语种信息 通过/open-api/goods/query-publish-fill-in-standard确认以下信息。 1、是否允许填写，"field_key":"skc_title","show":"show"时可传，"required":"true"时必填。 2、可入参的语种范围，以及每个语种的最大字符数（含空格），language_title_max_length_list确认
    - **language** `string` **必填** — 语种。例如英文-en。
    - **name** `string` **必填** — 语种内容
  - **supplier_code** `string` — 商家侧SKC维度货号，最多200个字符 例: `random_supplier_code`
  - **image_info** `object` — SKC图片列表
    - **image_group_code** `string` — 图片组的唯一编码，由平台生成。 例: `random_image_group_code`
    - **image_info_list** `object[]` **必填** — 图片明细
      - **image_item_id** `int64` — 图片的唯一编码，由平台生成。 例: `60`
      - **image_sort** `integer` **必填** — 图片排序。 同个图片组内序号值不可重复。type=1的图片sort必须是1。 例: `5`
      - **image_type** `integer` **必填** — 图片类型。1-主图,2-细节图,5-方块图,6-色块图。 需要提供哪些类型的图片、数量限制、各类型图片的尺寸要求，请参考商品图片方案了解详细信息。 例: `71`
      - **image_url** `string` **必填** — 图片链接。 必须为SHEIN格式的URL，可通过外链转换或本地图片上传获取。 例: `random_image_url`
  - **site_detail_image_info_list** `object[]` — SKC站点详情图列表。 传入的均是type=7的图片。
    - **image_group_code** `string` — 图片组的唯一编码，由平台生成。 编辑时必填，可通过/open-api/goods/spu-info获取。 例: `random_image_group_code`
    - **image_info_list** `object[]` **必填** — 图片明细
      - **image_item_id** `int64` — 图片的唯一编码，由平台生成。 例: `75`
      - **image_sort** `integer` **必填** — 图片排序。 同个图片组内序号值不可重复。 例: `24`
      - **image_url** `string` **必填** — 图片链接。 必须为SHEIN格式的URL，可通过外链转换或本地图片上传获取。 例: `random_image_url`
    - **site_abbr_list** `string[]` **必填** — 站点列表 例: `random_site_abbr_list`
  - **suggested_retail_price** `object` — 建议零售价。非所有商家可用，能否传值需通过商品发布规范接口确认，"field_key":"suggest_price","required":"true"时必填，"show":"false"时不可传 新增SKC时可传，编辑场景时不能传。
    - **currency** `string` **必填** — 币种缩写。 商家可用币种是商品发布规范的【currency】。（目前不支持JPY，可暂用USD代替） 例: `EUR`
    - **price** `double` **必填** — 价格。 最多2位小数（日元不支持小数）。 例: `1.01`
  - **shelf_require** `string` — 是否强制到货SHEIN仓才上架。0:否，1:是。 全托管模式必填，其他模式是否必填需通过商品发布规范接口确认，"field_key":"shelf_require","required":"true"时必填，"show":"false"时不可传。 例: `random_shelf_require`
  - **shelf_way** `integer` — 上架方式。1-自动上架；2-定时上架。 全托管和半托管商家必填。 例: `0`
  - **hope_on_sale_date** `datetime` — 期望上架时间。 当shelf_way=2-定时上架时，hope_on_sale_date必填，否则不填；时间给到时分秒，按北京时间给值，e.g.:2022-03-21 00:00:00。 例: `2025-12-25T06:06:15.012Z`
  - **proof_of_stock_list** `object[]` — 库存证明。 部分商家必填，需通过商品发布规范接口确认，"field_key":"proof_of_stock","required":"true"时必填，"show":"false"时不可传 支持image、PDF格式文件，大小不超过3M，图片/文件总数不超过1个。
    - **file_name** `string` **必填** — 文件名 例: `random_file_name`
    - **type** `integer` **必填** — 文件类型。 1: Image; 2: PDF 例: `29`
    - **url** `string` **必填** — 文件链接。 例: `random_url`
  - **sku_list** `object[]` — SKU列表。
    - **sku_code** `string` — SKU唯一编码，由平台生成。 编辑SKU时必填。 例: `random_sku_code`
    - **sale_attribute_list** `object[]` — SKU销售属性列表。 只能入参attribute_type=1 且 attribute_label=0/1的属性。attribute_status=3为必填属性，需通过店铺可用属性确认； SKC下无SKU时，销售属性给空；若有SKU，最多有2个属性，且不同SKC下SKU属性数量需相同。新增SKU时必传，编辑场景不可修改。
      - **attribute_id** `int64` **必填** — 销售属性ID 例: `82`
      - **attribute_value_id** `int64` — 销售属性值ID 例: `61`
      - **custom_attribute_value** `string` — 自定义属性值。使用方式详见文档。 仅在销售属性ID支持自定义属性值时，才可在此字段内入参，可通过/open-api/goods/get-custom-attribute-permission-config确认。 属性值要求：字符数50以内；支持半角符号，不可输入全角符号；不支持unicode，检验表达式可参考：String emojiPattern = "[\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u2600-\\u27ff]" 例: `random_custom_attribute_value`
      - **language** `string` — 自定义属性值的语种。 支持的语种：en、zh-cn、fr、es、it。如果ERP不传多语言内容，平台会做系统翻译。 例: `random_language`
    - **supplier_sku** `string` — 商家维护的SKU编码。 supplier_sku在店内要求唯一，不可重复。1个supplier_sku只对应1个平台sku，最多200个字符。可通过接口确认输入的值在店铺内是否已存在：/open-api/goods/product/check-supplierSku-repeated 例: `random_supplier_sku`
    - **length** `string` — 含包装尺寸：长度（cm）。 支持输入正数，最多2位小数。 例: `random_length`
    - **width** `string` — 含包装尺寸：宽度（cm）。 支持输入正数，最多2位小数。 例: `random_width`
    - **height** `string` — 含包装尺寸：高度（cm）。 支持输入正数，最多2位小数。 例: `random_height`
    - **weight** `double` — 含包装重量：重量（g）。 支持输入正整数，不可输入0 例: `51`
    - **weight_unit** `string`
    - **length_width_height_unit** `string`
    - **mall_state** `integer` — sku商城销售状态。 1、在售；2、停售；注意：如果sku设置为停售，不会保存该sku的库存数量，库存数量会在商家后台显示为空 例: `42`
    - **stop_purchase** `integer` — 采购状态（仅全托管可使用） 1：可采，2：停采 例: `86`
    - **quantity_info** `object` — sku维度件数信息 若商品原本就有SKU维度件数，在部分编辑新增SKC或SKU时，新增SKU全部需要提供件数。
      - **quantity** `integer` **必填** — 件数值。 已审核通过的SKU不可修改件数信息。 例: `84`
      - **quantity_type** `integer` **必填** — 件数类型。1-单件 2-同品多件。 已审核通过的SKU不可修改件数信息。 例: `47`
      - **quantity_unit** `integer` **必填** — 件数单位。1-件 2-双 相同SKC下所有的SKU，件数单位必须保持一致。已审核通过的SKU不可修改件数信息。 例: `13`
    - **package_type** `integer` — sku维度包装类型。枚举值：0:清空包装 1：软包装+软物，2：软包装+硬物，3：硬包装，4：真空。 若商品原本就有SKU维度包装类型，在部分编辑新增SKC或SKU时，新增SKU全部需提供包装类型。 例: `15`
    - **supplier_barcode** `object` — 商家条码。仅部分商家可用，需通过接口确认：/open-api/goods/query-publish-fill-in-standard，响应中的supplier_barcode的show=true代表可填。
      - **barcode** `string` **必填** — 商品条码。不论哪种条码类型都仅支持数字，最多32位。 同SKC下的SKU中，条码不可重复。 例: `random_barcode`
      - **barcode_type** `string` **必填** — 条码类型。枚举值：EAN、UPC 例: `random_barcode_type`
    - **image_info** `object` — SKU图片列表。 若商品原本有SKU图，在部分编辑中新增SKC或SKU时，新增SKU必须全部提供SKU图
      - **image_group_code** `string` — 图片组的唯一编码，由平台生成。 编辑时必填，可通过/open-api/goods/spu-info获取。 例: `random_image_group_code`
      - **image_info_list** `object[]` **必填** — 图片明细
        - **image_item_id** `int64` — 图片的唯一编码，由平台生成。 若提供新图片可不填，若提供旧图片需要填写，可通过/open-api/goods/spu-info获取。 例: `22`
        - **image_sort** `integer` — 图片排序。 同个图片组内序号值不可重复。type=1的图片sort必须是1。 例: `11`
        - **image_type** `integer` — 图片类型。 SKU图片仅可传type=1的图片。 例: `71`
        - **image_url** `string` — 图片链接。 必须为SHEIN格式的URL，可通过外链转换或本地图片上传获取。 例: `random_image_url`
    - **price_info_list** `object[]` — 售价信息（仅自运营、POP使用） 新增SKC/SKU时必传，编辑时不可传。更新已发布SKU价格需通过【更新商品售价】调整。 售价按上架站点维度提供。
      - **base_price** `double` **必填** — 原价。 仅支持数字，最多2位小数（日元不支持小数）。原价必须大于特价。 例: `71.04`
      - **currency** `string` **必填** — 币种缩写。 币种和站点绑定，例如美国站点币种给USD，各站点的币种通过查询站点币种获取。 例: `BRL`
      - **special_price** `double` — 特价。 仅支持数字，最多2位小数（日元不支持小数）。特价必须小于原价。 例: `68.6`
      - **sub_site** `string` **必填** — 站点（子站点）。 店铺可上架的站点范围通过查询站点币种获取。此处用site_status=1（启用）的site_abbr 例: `random_sub_site`
    - **cost_info** `object` — SKU供货价 可用应用模式：半托管、全托管。新增SKCSKU时必传，编辑时不可传。若需要更新已审核通过的SKU供货价，需调用【更新供货价】API修改。
      - **cost_price** `string` **必填** — 供货价格。最多2位小数点。数字在0-100000之间。不可输入负数。 例: `1.01`
      - **currency** `string` **必填** — 币种缩写。 商家可用币种是商品发布规范的【currency】 例: `CNY`
    - **stock_info_list** `object[]` — 库存信息 新增SKC/SKU时必传，编辑场景不可传。更新库存使用修改库存（自运营&半托）、采购商库存更新（全托管）处理。
      - **inventory_num** `integer` **必填** — 商品总库存数。可以为0， 例: `4`
      - **supplier_warehouse_id** `int64` — 商家仓库ID 。 当店铺有多个仓库，则该字段必填，可通过【商家仓库列表查询】API获取 例: `23`
      - **supplier_warehouse_name** `string` — 商家仓库名称。 可通过【商家仓库列表查询】API获取。 例: `random_supplier_warehouse_name`
    - **competing_product_link** `string` — 商品信息参考链接。 部分商家必填，通过商品发布规范接口确认，"field_key":"reference_product_link","required":"true"时必填，"show":"false"时不可传。链接字符长度不超过300。编辑时不穿字段代表清空数据。 例: `random_competing_product_link`
    - **minimum_stock_quantity** `integer` — 最小备货数量。 仅支持输入整数，范围：[1，1000000] 。 能否传值需通过商品发布规范接口确认，"field_key":"minimum_stock_quantity","required":"true"时必填，"show":"false"时不可传 例: `10`
- **product_video_list** `object[]` — 商品视频。视频需先通过平台转换后才能使用，商品视频绑定在站点维度，每个站点只允许绑定一个视频。视频的使用方式，详见文档。
  - **sites** `string[]` — 子站点。一个视频可以绑定多个站点，但一个站点只能绑定一个视频。
  - **video_url** `string` — 视频链接。视频需先通过平台转换后才能使用，商品视频绑定在站点维度，每个站点只允许绑定一个视频。视频的使用方式，详见文档。

## 响应参数

- **bbl** `object` — 响应异常时的bbl相关信息
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — 响应编码 成功：0
- **info** `object` — 商品编辑校验结果
  - **extra** `object` — 拓展信息
  - **mcc_valid_result** `object[]` — 平台治理规则校验结果
    - **message** `string` — 消息内容
    - **type** `integer` — 消息类型(1:预警;2:拦截)
  - **pre_valid_result** `object[]` — 校验结果描述
    - **form** `string` — 拦截原因所属字段
    - **form_name** `string` — 拦截原因所属字段
    - **messages** `string[]` — 校验不通过原因
    - **module** `string` — 拦截原因所属的模块
    - **other_language_message_map** `object` — 其他语种弹窗错误信息列表（每个其他语种都有哪些错误信息）
      - ***** `string[]`
    - **skc_error_message_map** `object`
      - ***** `object`
  - **skc_list** `object[]` — SKC信息
    - **skc_name** `string` — SKC名称
    - **sku_list** `object[]` — SKU信息
      - **sku_code** `string` — SKU编码
      - **supplier_sku** `string` — 商家SKU
  - **spu_name** `string` — 编辑成功后返回的SPU Name
  - **success** `boolean` — 校验结果 例: `0`
  - **version** `string` — 审核版本号。 对应查询审核状态接口中的入参version。
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods/product/partialEdit' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1766713566501' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: openapi-test01.sheincorp.cn' \
--header 'Connection: keep-alive' \
--data-raw '{
  "spu_name": "c2512231945875937",
  "skc_list": [
    {
      "sale_attribute": {
        "attribute_id": 2147484187,
        "custom_attribute_value":"new bennie custom attribute 1224 for skc"
      },
      "shelf_way": 1,
      "supplier_code":"newskc",
      "image_info": {
        "image_info_list": [
          {
            "image_sort": 1,
            "image_type": 1,
            "image_url": "https://imgdeal-test01.shein.com/images3_pi/2024/12/10/27/17338148602250996226.jpeg"
          },
          {
            "image_sort": 4,
            "image_type": 6,
            "image_url": "https://imgdeal-test01.shein.com/images3_pi/2024/12/10/27/17338148602250996226.jpeg"
          }
        ]
      },
      "site_detail_image_info_list": [
        {
          "image_info_list": [
            {
              "image_sort": 1,
              "image_url": "https://imgdeal-test01.shein.com/images3_pi/2024/12/10/27/17338148602250996226.jpeg"
            }
          ],
          "site_abbr_list": [
            "shein-us"
          ]
        }
      ],
      "proof_of_stock_list": [
        {
          "file_name": "fd",
          "type": "1",
          "url": "https://imgdeal-test01.shein.com/images3_pi/2024/12/10/27/17338148602250996226.jpeg"
        }
      ],
      "sku_list": [
        {
          "sale_attribute_list": [
            {
              "attribute_id": 2147484186,
              "attribute_value_id":2147488283,
              "language":"en"
            }
          ],
          "price_info_list": [
            {
              "base_price": 334,
              "currency": "USD",
              "special_price": 35,
              "sub_site": "shein-us"
            }
          ],
          "stock_info_list": [
            {
              "supplier_warehouse_id":"PS8399728690",
              "inventory_num": 1
            }
          ],
          "supplier_sku": "3663024554556-6403",
          "mall_state": 1,
          "height": "1",
          "length": "1",
          "weight": "1",
          "width": "1"
        },
        {
          "sale_attribute_list": [
            {
              "attribute_id": 2147484186,
              "attribute_value_id":2147493697,
              "language":"en"
            }
          ],
          "price_info_list": [
            {
              "base_price": 334,
              "currency": "USD",
              "special_price": 35,
              "sub_site": "shein-us"
            }
          ],
          "stock_info_list": [
            {
              "supplier_warehouse_id":"PS8399728690",
              "inventory_num": 1
            }
          ],
          "supplier_sku": "36630056-6403",
          "mall_state": 1,
          "height": "1",
          "length": "1",
          "weight": "1",
          "width": "1"
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
    "success": true,
    "spu_name": "c2512231945875937",
    "skc_list": [
      {
        "skc_name": "sc251223194587593767372",
        "sku_list": [
          {
            "sku_code": "I4mjm7n4ypw0dl",
            "supplier_sku": "3663024554556-6403"
          },
          {
            "sku_code": "I8mjm7n4yrjafi",
            "supplier_sku": "36630056-6403"
          }
        ]
      }
    ],
    "version": "SPMP251226144044259",
    "pre_valid_result": null,
    "mcc_valid_result": null,
    "burying_point_result": [],
    "extra": {},
    "filtered_result": null
  },
  "bbl": null,
  "traceId": "842bcf487b244a5f"
}
```

&lt;/details>

## 其他场景示例

### 简化的新增SKU

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "success": true,
    "spu_name": "c2512231945875937",
    "skc_list": [
      {
        "skc_name": "sc251223194587593737494",
        "sku_list": [
          {
            "sku_code": "I2mjm7dgz7f7xs",
            "supplier_sku": "366303456-6403"
          },
          {
            "sku_code": "I8mjiiw6urvy5f",
            "supplier_sku": ""
          },
          {
            "sku_code": "I7mjiiw6up3jln",
            "supplier_sku": ""
          }
        ]
      },
      {
        "skc_name": "sc251223194587593709855",
        "sku_list": [
          {
            "sku_code": "I5mjiiw6uu1x3j",
            "supplier_sku": ""
          },
          {
            "sku_code": "I2mjiiw6ut8uc6",
            "supplier_sku": ""
          }
        ]
      }
    ],
    "version": "SPMP251226142197169",
    "pre_valid_result": null,
    "mcc_valid_result": null,
    "burying_point_result": [],
    "extra": {},
    "filtered_result": null
  },
  "bbl": null,
  "traceId": "600bdeb4b64613cf"
}
```

### 仅更新某SKC的货号

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "success": true,
    "spu_name": "c2512181536493351",
    "skc_list": [
      {
        "skc_name": "sc251218153649335119952",
        "sku_list": [
          {
            "sku_code": "I2mjb4mlxwpmhy",
            "supplier_sku": "3663438228556-6403"
          },
          {
            "sku_code": "I8mjb4mlxx9hu4",
            "supplier_sku": "3663431028864423"
          }
        ]
      }
    ],
    "version": "SPMP251225312680881",
    "pre_valid_result": null,
    "mcc_valid_result": null,
    "burying_point_result": [],
    "extra": {},
    "filtered_result": null
  },
  "bbl": null,
  "traceId": "eafb97d610761d2d"
}
```

### 仅更新商品标题

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "success": true,
    "spu_name": "c250905438333",
    "skc_list": [
      {
        "skc_name": "sc25090543833308995",
        "sku_list": []
      },
      {
        "skc_name": "sc25090543833306711",
        "sku_list": []
      },
      {
        "skc_name": "sc25090543833396934",
        "sku_list": []
      }
    ],
    "version": "SPMP-API250908151492720",
    "pre_valid_result": null,
    "mcc_valid_result": null,
    "burying_point_result": null,
    "extra": {}
  },
  "bbl": null,
  "traceId": "2dfee9e21b86c23"
}
```

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002087。