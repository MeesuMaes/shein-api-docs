# 商品发布/编辑

`POST /open-api/goods/product/publishOrEdit`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v159 ｜ **更新时间**：2026-11-03 10:18:28 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002018](https://open.sheincorp.com/documents/apidoc/detail/3002018)

## 接口说明

接口支持场景：新发布商品（SPU）、更新已发布的商品信息、在已发布商品下新增SKC/SKU
各场景的对接指南：不同应用模式、不同场景中此接口的使用方式有较大差异，建议浏览API文档时结合场景的对接方案，了解详细的对接。
- 新发布商品场景：商品发布-自运营、商品发布-半托管、商品发布-全托管
- 更新已发布商品 & 在已发布商品下新增SKC/SKU场景：商品编辑-自运营、商品编辑-半托管、商品编辑-全托管

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` **必填** — 支持返回的多语言报错信息，可用的语种：简体中文：zh-cn、英语：en、西班牙语：es、法语：fr、德语：de、意大利语：it、巴西葡萄牙语：pt-BR、葡萄牙葡萄牙语：pt-PT、波兰语：pl、土耳其语：tr、阿拉伯语：ar、韩语：ko、日语：ja、瑞典语：sv

## 请求参数

- **brand_code** `string` — 店铺可用的品牌code。 部分商家必填，通过【商品发布规范】API确认，当field_key=brand_code & required=true则必填。code必须从通过【店铺查品牌列表】API获取。 编辑商品信息时，传""代表清空。
- **category_id** `int64` **必填** — 末级分类id。 通过【店铺查商品末级分类】API获取，last_category=true代表末级分类。注意：编辑已审核通过的SPU时，不允许修改category_id。
- **product_type_id** `int64` — 商品类型id。 发布新品时需通过【店铺查商品末级分类】API获取。编辑商品时建议通过/open-api/goods/spu-info来获取，平台会有修改商品category_id但不改product_type_id的情况。
- **source_system** `string` — 固定OpenAPI
- **spu_name** `string` — 平台生成的SPU唯一编码。 新发布商品/在已发布下新增SKC时不可传，编辑必传。
- **supplier_code** `string` — 商家货号，到主规格粒度，最多200个字符，具体可查看supplier_code FAQ
- **suit_flag** `string` — 是否套装。1-是，0-否。 API暂不支持套装，所以必须传0。不入参时系统默认赋值0。
- **is_spu_pic** `boolean` — 是否使用新版图片方案。true-用新方案，false-用旧方案 不传字段默认给false。新旧方案的传图差异大，请参考商品图片方案了解详细信息。
- **ip_character_list** `object[]` — 商品IP。目前每个商品仅支持绑定1个IP。 店铺可用的IP可通过接口获取：/open-api/goods/query-ip-list。店铺能否传IP，需通过规范接口确认，"ip_character"的"show": true代表可传。
  - **ip_id** `int64` **必填** — IP的ID。若传ip_character_list，则ip_id必传。
  - **ip_name** `string` — IP的英语名称
  - **ip_name_cn** `string` — IP的中文名称
- **fill_configuration_info** `object` — 商品信息填写规则。 商品发布有较多新的填写规则，接口层兼容新老方案，但需开发者通过此字段告知平台当前使用了新方案还是老方案，从而决策如何进行发布校验。
  - **filled_quantity_to_sku** `boolean` — 是否在sku维度填写件数。 此字段用于告诉系统， 不是所有商家所有类目都支持在sku维度传件数，请先查询商品发布规范，若"field_key": "quantity_info"，且"show"="true"，则代表此分类支持SKU填写件数。 不传值默认按false处理，若传true，则必须在sku_list -> quantity_info中传值。更多件数入参示例参考FAQ
  - **fill_configuration_tags** `string[]` — 是否在本次入参中填写某些信息。若填写了A信息则在此处填写上A。 目前可输入的枚举值：PACKAGE_TYPE_TO_SKU - 对应SKU维度的包装类型（package_type）
- **image_info** `object` — SPU图片列表。 仅is_spu_pic=true时可传，请参考商品图片方案了解详细信息。 编辑商品信息时，如果不传字段代表清空数据。
  - **image_group_code** `string` — 图片组编码。 新发布商品/在已发布下新增SKC时不可传，编辑必传。通过查询SPU详情获取。
  - **image_info_list** `object[]` — 图片列表。 需要提供哪些类型的图片、数量限制、各类型图片的尺寸要求，请参考商品图片方案了解详细信息。
    - **image_item_id** `int64` — 由平台生成的图片唯一编码。 新发布商品/在已发布下新增SKC时不可传，编辑时部分情况必传，请参考入参示例
    - **image_sort** `integer` — 图片序号。 同个图片组内序号值不可重复。若由传图片type=1，则此图片必须sort=1。
    - **image_type** `integer` — 图片类型。1-主图,2-细节图,5-方块图,6-色块图。 需要提供哪些类型的图片、数量限制、各类型图片的尺寸要求，请参考商品图片方案了解详细信息。
    - **image_url** `string` — 图片链接。 必须为SHEIN格式的URL，可通过外链转换或本地图片上传获取。
- **multi_language_desc_list** `object[]` — 商品描述列表（支持多语言） 编辑商品信息时，如果不传字段代表清空数据。
  - **language** `string` **必填** — 语种。 若提供描述则必须提供默认语种，默认语种需通过商品发布规范API获取default_language。
  - **name** `string` **必填** — 多语言描述，最多5000个字符。请不要输入html内容，不支持emoji和特殊符号（校验正则： .*[\\ud800\\udc00-\\udbff\\udfff\\ud800-\\udfff].*）
- **multi_language_name_list** `object[]` **必填** — 商品名称列表（支持多语言）
  - **language** `string` **必填** — 语种。 若提供描述则必须提供默认语种，默认语种需通过商品发布规范API获取default_language。
  - **name** `string` **必填** — 商品名称。不支持emoji。 默认语种下的名称长度限制：至少2个字符，最大字符数需查询商品发布规范接口，入参category_id后获取default_language_title_max_length（不同商品分类、不同语种下字符上限不同）。 非默认语种下的名称长度限制：至少2个字符，最多1000字符
- **product_attribute_list** `object[]` **必填** — 商品属性列表。 此列表只能入参attribute_type=3/4的属性。属性使用方式请参考商品属性文档。 编辑商品信息时，如果不传字段代表清空属性。
  - **attribute_extra_value** `string` — 属性值（手动输入类型）。 当属性的输入方式attribute_mode=0/4时，需要在此处入参。支持输入正整数、文字 当attribute_type=3，且attribute_mode=4（下拉多选+手动输入）时，同属性ID下多个属性值的手动输入值之和必须=100。例如成分属性，A成分含10，B成分含90。
  - **attribute_id** `int64` **必填** — 属性ID。 商品属性中仅可入参attribute_type=3/4的属性。 必填商品属性有2类：一是attribute_status=3的属性，通过店铺可用属性确认；二是因选了A属性导致B属性必填的关联属性，通过查询关联属性填写规则确认。
  - **attribute_value_id** `int64` **必填** — 属性值ID。当属性的输入方式attribute_mode=1/3/4时，需要在此处入参。 当attribute_mode=3（下拉单选）时，代表属性id下只能有1个属性值id；当attribute_mode=1（下拉多选）/4（下拉多选+手动输入）时，代表属性id下可以有N个属性值id，多选时每个属性值需要以单独一组数据形式入参，此字段不支持数组，最多可选属性值个数通过属性的attribute_input_num判断。
- **site_list** `object[]` — 上架站点。 可用模式：自运营、半托管、POP。 新发布商品/在已发布下新增SKC时必须传，编辑时不可传。
  - **main_site** `string` — 主站点。 通过[查询店铺可售站点和站点币种]API获取到的字段mainSite的值
  - **sub_site_list** `string[]` — 子站点。 商品上新必填，通过【查询店铺可售站点和站点币种】API获取到的字段【siteAbbr】的值，只能使用site_status=1（启用状态）的站点。
- **product_video_list** `object[]` — 商品视频。视频需先通过平台转换后才能使用，商品视频绑定在站点维度，每个站点只允许绑定一个视频。视频的使用方式，详见文档。
  - **sites** `string[]` — 子站点。一个视频可以绑定多个站点，但一个站点只能绑定一个视频。
  - **video_url** `string` — 视频链接。视频需先通过平台转换后才能使用，商品视频绑定在站点维度，每个站点只允许绑定一个视频。视频的使用方式，详见文档。
- **size_attribute_list** `object[]` — 尺码表。尺码属性复杂，请参考商品属性文档。当可用属性中有必填尺码属性时，尺码表必传。（type=2&status=3） 编辑商品信息时，如果不传字段代表清空属性。
  - **attribute_id** `int64` — 属性ID。 此字段只能入参attribute_type=2的属性。存在必填的尺码属性，attribute_status=3为必填属性，通过店铺可用属性确认；
  - **attribute_value_id** `int64` — 属性值ID。 尺码属性不需要传此值，需要在attribute_extra_value给值。
  - **attribute_extra_value** `string` — 属性值（手动输入类型）。 当属性的输入方式attribute_mode=0/4时，需要在此处入参。仅支持输入正整数。
  - **relate_sale_attribute_id** `int64` — 关联的销售属性ID。 尺码属性可与销售属性关联，形成尺码表。注意：只能关联sku维度销售属性。例如尺码：尺码属性：长度，销售属性:尺寸-S，组合后才是完整尺码表。
  - **relate_sale_attribute_value_id** `int64` — 关联的销售属性值ID。注意：只能关联sku维度销售属性。
  - **relate_sale_attribute_value** `string` — 关联的自定义属性值。当SKU的属性值为自定义属性值时，在此处入参，内容需要和SKU属性值保持一致。如果SKU属性值中使用value形式，则此处也必须用value。 使用方式详见文档。
- **skc_list** `object[]` **必填** — skc列表。 一个spu下最多40个skc。 当主销售属性填写规则=不填时（/open-api/goods/query-attribute-template中，main_attribute_status=1），一个SPU下只能有一个SKC，
  - **image_info** `object` **必填** — SKC图片列表。 新旧图片方案的图片上传要求不同，请参考商品图片方案确认SKC层级图片需要哪些图片类型、数量限制、尺寸要求。 编辑商品信息时，如果不传字段代表清空数据。
    - **image_group_code** `string` — 图片组编码。 新发布商品/在已发布下新增SKC时不可传，编辑必传。通过查询SPU详情获取。
    - **image_info_list** `object[]` **必填** — 图片列表
      - **image_item_id** `long` — 由平台生成的图片唯一编码。 新发布商品/在已发布下新增SKC时不可传，编辑时部分情况必传，请参考入参示例
      - **image_sort** `integer` **必填** — 图片序号。 同个图片组内序号值不可重复。注意image_type=1的图片sort必须为1。
      - **image_type** `integer` **必填** — 图片类型。1-主图（最多1张）,2-细节图（最多10张）,5-方块图,6-色块图(色块图单skc非必填，多skc必填)。 需要提供哪些类型的图片、数量限制、各类型图片的尺寸要求，请参考商品图片方案了解详细信息。
      - **image_url** `string` **必填** — 图片链接。 必须为SHEIN格式的URL，可通过外链转换或本地图片上传获取。
  - **sale_attribute** `object` **必填** — SKC销售属性。 新发布SPU/在SPU下新增SKC时必传，编辑必传且不可修改。一个商品必有且只有1个SKC销售属性。 销售属性通过/open-api/goods/query-attribute-template获取，SKC只能入参attribute_type=1且 attribute_label=1的属性。若有必填销售属性（attribute_status=3），则必填。当主销售属性填写规则=不填时（main_attribute_status=1），SKC销售属性必填且只能填【默认】。
    - **attribute_id** `int64` **必填** — 销售属性ID
    - **attribute_value_id** `int64` **必填** — 销售属性值ID
    - **custom_attribute_value** `string` — 自定义属性值。使用方式详见文档。 仅在销售属性ID支持自定义属性值时才可入参，是否支持可通过/open-api/goods/get-custom-attribute-permission-config确认。 属性值要求：字符数50以内；支持半角符号，不可输入全角符号；不支持unicode，检验表达式可参考：String emojiPattern = "[\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u2600-\\u27ff]"
    - **language** `string` — 自定义属性值的语种。 仅支持入参1个语种，支持的语种：en、zh-cn、fr、es、it。如果ERP不传多语言内容，平台会做系统翻译。
  - **skc_name** `string` — 平台生成的SKC唯一编码。 新增场景不能传，编辑场景若是更新已发布SKC则必传，若是新增SKC则不用传。
  - **supplier_code** `string` **必填** — 商家侧SKC维度货号，最多200个字符
  - **skc_title** `string` — skc维度商品标题（不推荐使用此字段，建议使用skc_multi_language_name_list） 不是所有商家均可填写，需通过商品发布规范接口确认，"field_key":"skc_title","show":"show"时可传，"required":"true"时必填。入参的内容将作为skc标题的默认语种录入。编辑时不传字段代表清空数据。
  - **skc_multi_language_name_list** `object[]` — SKC维度标题多语言列表。若入参则必须提供skc的默认语种信息 通过/open-api/goods/query-publish-fill-in-standard确认以下信息。 1、是否允许填写，"field_key":"skc_title","show":"show"时可传，"required":"true"时必填。 2、可入参的语种范围，以及每个语种的最大字符数（含空格），language_title_max_length_list确认
    - **language** `string` — 语种。例如英文-en。
    - **name** `string` — 语种下标题。
  - **sku_list** `object[]` **必填** — sku列表。一个skc下最多400个sku。 1、如果SKC下没有SKU（只有颜色无尺码），依旧要给sku列表数据，sku的销售属性按空处理，但此时一个SKC下只能有1个SKU 2、各个SKC下的SKU，销售属性和属性值的数量需保持一致。例如颜色/红-尺码S、尺码M，颜色/白-尺码S、尺码
    - **cost_info** `object` — SKU供货价 可用应用模式：半托管、全托管。新发布商品/新增SKCSKU时必传，编辑时不可传。若需要更新已审核通过的SKU供货价，需调用【更新供货价】API修改。
      - **cost_price** `string` — 供货价格。最多2位小数点。数字在0-100000之间。不可输入负数。 例: `1.01`
      - **currency** `string` — 币种缩写。 商家可用币种是商品发布规范的【currency】 例: `CNY`
    - **height** `string` **必填** — 含包装尺寸：高度。支持输入正数，最多2位小数。 不传单位length_width_height_unit时，单位默认为cm。
    - **length** `string` **必填** — 含包装尺寸：长度。支持输入正数，最多2位小数。 不传单位length_width_height_unit时，单位默认为cm。
    - **width** `string` **必填** — 含包装尺寸：宽度。支持输入正数，最多2位小数。 不传单位length_width_height_unit时，单位默认为cm。
    - **weight** `double` **必填** — 含包装的重量。数值必须大于0，允许入参小数，最多2位小数点。 不传重量单位weight_unit，单位默认为g。
    - **weight_unit** `string` — 重量单位。可输入的单位需查询发布规范接口获取（不同分类可用单位不同） 全量枚举值为：g / lb / Oz。不传值时默认为g
    - **length_width_height_unit** `string` — 长宽高单位。可输入的单位需查询发布规范接口获取（不同分类可用单位不同） 全量枚举值：cm / Inch / Ft，不传时默认为 cm
    - **mall_state** `integer` **必填** — sku商城销售状态。 1、在售；2、停售；注意：如果sku设置为停售，不会保存该sku的库存数量，库存数量会在商家后台显示为空
    - **sku_code** `string` — 平台生成的SKU唯一编码。 新发布商品/在已发布商品下新增SKU时不可传，编辑已有SKU时必传
    - **stop_purchase** `integer` — 采购状态（仅全托管可使用且必填） 1：可采，2：停采
    - **image_info** `object` — SKU图片列表。 所有商品在均可上传SKU图片，仅支持提供1张图片。符合以下任意条件时必填：1、SKC下某个SKU有图，则SKC下所有SKU都需要传图。2、当SKU的件数值≥2时，此SKU图必传，这条规则也会触发1。 编辑商品信息时，如果不传字段代表清空数据。
      - **image_group_code** `string` — 图片组编码。 新发布商品/在已发布下新增SKC时不可传，编辑必传。通过查询SPU详情获取。
      - **image_info_list** `object[]` — 图片列表。 需要提供哪些类型的图片、数量限制、各类型图片的尺寸要求，请参考商品图片方案了解详细信息。
        - **image_item_id** `int64` — 由平台生成的图片唯一编码。 新发布商品/在已发布下新增SKC时不可传，编辑时部分情况必传，请参考入参示例
        - **image_sort** `integer` — 图片序号。 同个图片组内序号值不可重复。若由传图片type=1，则此图片必须sort=1。
        - **image_type** `integer` — 图片类型。SKU图仅支持image_type=1。图片要求如下： ● 像素1340px*1785px；或宽高比例1:1，像素范围900px-2200px ● 格式JPG/JPEG/PNG ● 大小≤3MB
        - **image_url** `string` — 图片链接。 必须为SHEIN格式的URL，可通过外链转换或本地图片上传获取。
    - **supplier_sku** `string` **必填** — 商家维护的SKU编码。 supplier_sku在店内要求唯一，不可重复。1个supplier_sku只对应1个平台sku，最多200个字符。可通过接口确认输入的值在店铺内是否已存在：/open-api/goods/product/check-supplierSku-repeated
    - **supplier_barcode** `object` — 商家条码。仅部分商家可用，需通过接口确认：/open-api/goods/query-publish-fill-in-standard，响应中的supplier_barcode的show=true代表可填。 非必填，若是更新场景，传null=不更新，传""=清空，传具体值=覆盖更新.
      - **barcode** `string` — 商品条码。不论哪种条码类型都仅支持数字，最多32位。 同SKC下的SKU中，条码不可重复。
      - **barcode_type** `string` — 条码类型。枚举值：EAN、UPC
    - **competing_product_link** `string` — 商品信息参考链接。 部分商家必填，通过商品发布规范接口确认，"field_key":"reference_product_link","required":"true"时必填，"show":"false"时不可传。链接字符长度不超过300。编辑时不穿字段代表清空数据。
    - **price_info_list** `object[]` **必填** — 售价信息（仅自运营、POP使用） 新发布商品/新增SKCSKU时必传，编辑时不可传。更新已发布SKU价格需通过【更新商品售价】调整。 售价按上架站点维度提供。
      - **base_price** `double` **必填** — 原价。 价格必须大于0，最多2位小数，部分币种仅允许整数/整百，各币种的精度要求详见FAQ。原价必须大于特价。
      - **currency** `string` **必填** — 币种缩写。 币种和站点绑定，例如美国站点币种给USD，各站点的币种通过查询站点币种获取。 例: `BRL`
      - **special_price** `double` — 特价。 价格必须大于0，最多2位小数，部分币种仅允许整数/整百，各币种的精度要求详见FAQ。特价必须小于原价。 注意：2026年5月8日起，商品的原价、特价将合并为一个价格字段“售价”，API入参允许传入原价和特价，但会优先取特价为售价，无特价取原价。
      - **sub_site** `string` **必填** — 站点（子站点）。 店铺可上架的站点范围通过查询站点币种获取。此处用site_status=1（启用）的site_abbr
    - **site_rrp_info_list** `object[]` — sku维度建议零售价。使用方式详见文档： https://open.sheincorp.com/documents/system/bf5a59ca-d378-4417-a359-f07cc89bf96b
      - **currency** `string` — 站点币种
      - **price** `double` — 建议零售价格，不同币种的精度要求不同，精度要求参考FAQ
      - **site_abbr** `string` — 站点缩写。 分站点规则下填写站点名，不分站点规则下不用写站点
      - **type_one_proof** `object` — 类型一证明材料
        - **attachments** `string[]` — 证明材料附件列表，图片或PDF的URL， 上传材料不能超过6个。 URL需要使用SHEIN链接，使用接口转换获取：/open-api/goods/discuss/upload-discuss-file
        - **proof_link** `string` — 网站地址，不超过1000个字符
      - **type_two_proof** `object` — 类型二证明材料
        - **attachments** `string[]` — 证明材料附件列表，图片或PDF的URL， 上传材料不能超过6个。 URL需要使用SHEIN链接，使用接口转换获取：/open-api/goods/discuss/upload-discuss-file
        - **proof_link** `string` — 网站地址，不超过1000个字符
    - **sale_attribute_list** `object[]` — SKU销售属性列表。 只能入参attribute_type=1 且 attribute_label=0/1的属性。attribute_status=3为必填属性，需通过店铺可用属性确认； SKC下无SKU时，销售属性给空；若有SKU，最多有2个属性，且不同SKC下SKU属性数量需相同。新发布商品/新增SKC时必传，编辑场景必传但不可修改。
      - **attribute_id** `int64` — 销售属性ID
      - **attribute_value_id** `int64` — 销售属性值ID
      - **custom_attribute_value** `string` — 自定义属性值。使用方式详见文档。 仅在销售属性ID支持自定义属性值时，才可在此字段内入参，可通过/open-api/goods/get-custom-attribute-permission-config确认。 属性值要求：字符数50以内；支持半角符号，不可输入全角符号；不支持unicode，检验表达式可参考：String emojiPattern = "[\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u2600-\\u27ff]"
      - **language** `string` — 自定义属性值的语种。 支持的语种：en、zh-cn、fr、es、it。如果ERP不传多语言内容，平台会做系统翻译。
    - **sku_scope_attribute_list** `object[]` — SKU维度商品属性。 可通过/open-api/goods/query-attribute-template获取，date_data_dimension=3的属性是SKU维度商品属性。
      - **attribute_id** `int64` — 属性id
      - **attribute_value_id** `int64` — 属性值id
      - **attribute_extra_value** `string` — 属性值（手动输入值）
    - **stock_info_list** `object[]` **必填** — 库存信息 新发布商品/新增SKC时必传，编辑场景不可传。更新库存使用修改库存（自运营&半托）、采购商库存更新（全托管）处理。
      - **inventory_num** `integer` **必填** — 商品总库存数，数值范围[0,99999]
      - **supplier_warehouse_id** `string` — 商家仓库ID 。 当店铺有多个仓库，则该字段必填，可通过【商家仓库列表查询】API获取
      - **supplier_warehouse_name** `string` — 商家仓库名称。 可通过【商家仓库列表查询】API获取。
    - **quantity_info** `object` — sku维度件数信息 此接口入参字段“filled_quantity_to_sku”="true"时，才可以在此字段中传值。更多件数入参示例参考FAQ
      - **quantity_type** `integer` — 件数类型。1-单件 2-同品多件 3-混合套装（和suit_flag的定义的状态无关） 已审核通过的SKU不可修改件数信息。
      - **quantity_unit** `integer` — 件数单位。1-件 2-双 3- 套 相同SKC下所有的SKU，件数单位必须保持一致。已审核通过的SKU不可修改件数信息。
      - **quantity** `integer` — 件数值。 已审核通过的SKU不可修改件数信息。
    - **package_type** `string` — sku维度包装类型。此接口入参字段fill_configuration_tags中填写PACKAGE_TYPE_TO_SKU，则字段可填写，可传0-4； 枚举值：0:清空包装 1：软包装+软物，2：软包装+硬物，3：硬包装，4：真空）。
    - **minimum_stock_quantity** `string` — 最小备货数量。 仅支持输入整数，范围：[1，1000000] 。 能否传值需通过商品发布规范接口确认，"field_key":"minimum_stock_quantity","required":"true"时必填，"show":"false"时不可传
  - **suggested_retail_price** `object` — 建议零售价。非所有商家可用，能否传值需通过商品发布规范接口确认，"field_key":"suggest_price","required":"true"时必填，"show":"false"时不可传 新发布商品/新增SKC时可传，编辑场景时不能传。
    - **currency** `string` — 币种缩写。 可用的币种清单：USD, CNY, EUR, SAR, AED, CAD, MXN, HKD, VND, THB, GBP, INR, BRL, TRY, NZD。目前无接口动态查询可用币种。
    - **price** `double` — 价格。 仅支持正数，不可等于0，最多2位小数（日元不支持小数）。
  - **site_detail_image_info_list** `object[]` — 站点详情图列表。 图片要求：上传3:4图片，像素大于900px图片，最多可支持10张。 部分商家不可传图，需查询商品发布规范，若"field_key": "product_detail_pic"中的show为false，代表不可传图。
    - **image_group_code** `string` — 图片组编码。 新增场景不能传，编辑场景更新已发布SKC时必传（如果审核失败则不需要传）。通过查询SPU详情获取。
    - **site_abbr_list** `string[]` — 站点列表
    - **image_info_list** `object[]` — 图片信息
      - **image_item_id** `string` — 首次新增详情图不用传，已有详情图进行修改要传图片组ID
      - **image_sort** `integer` — 排序
      - **image_url** `string` — 图片链接 必须为SHEIN格式的URL，可通过外链转换或本地图片上传获取。使用type=7进行转换。
  - **proof_of_stock_list** `object[]` — 库存证明。 部分商家必填，需通过商品发布规范接口确认，"field_key":"proof_of_stock","required":"true"时必填，"show":"false"时不可传 支持image、PDF格式文件，大小不超过3M，图片/文件总数不超过1个。
    - **file_name** `string` — 文件名
    - **type** `string` — 文件类型。 1: Image; 2: PDF
    - **url** `string` — 文件链接。
  - **shelf_require** `string` — 是否强制到货SHEIN仓才上架。0:否，1:是。 全托管模式必填，其他模式是否必填需通过商品发布规范接口确认，"field_key":"shelf_require","required":"true"时必填，"show":"false"时不可传。
  - **shelf_way** `string` — 上架方式。1-自动上架；2-定时上架。 全托管和半托管商家必填。
  - **hope_on_sale_date** `string` — 期望上架时间。 当shelf_way=2-定时上架时，hope_on_sale_date必填，否则不填；时间给到时分秒，按北京时间给值，e.g.:2022-03-21 00:00:00。
- **sale_attribute_sort_list** `object[]` — 销售属性排序。 设置消费者商品详情页面上属性值的展示顺序，请调用【商品发布字段规范（含默认语种）】API，根据字段support_sale_attribute_sort判断次销售属性是否支持排序，主销售属性默认都是支持排序；
  - **attribute_id** `int64` **必填** — 属性名ID
  - **in_order_attribute_value_id_list** `int64[]` — 属性值ID排序列表。 列表内按期望顺序排列，以确保商品详情页面的顺序与传入参数中的属性值顺序一致。
  - **in_order_attribute_value_list** `object[]` — 排好序的属性值ID/自定义属性值备注列表。如果属性下有自定义属性值，需用这个字段，属性值用哪个形式就入参下面的哪个字段，按排序输入即可。 使用方式详见文档。
    - **attribute_value_id** `string` — 属性值ID
    - **custom_attribute_value** `string` — 自定义属性值的内容。入参内容必须和销售属性中填写的属性值一模一样。
- **sample_info** `object` — 样品信息。 能否传值需通过商品发布规范接口确认，"field_key":"sample_spec","required":"true"时必填。当样品信息必填时，最外层的size_attribute_list也需要传。
  - **sample_spec** `object` — 样品规格
    - **main_spec** `object` — 样品的主销售属性信息。
      - **attribute_id** `long` — 主销售属性id
      - **attribute_value_id** `long` — 主销售属性值id
      - **attribute_value_name** `string` — 主销售属性的自定义属性值
    - **sub_spec_list** `object[]` — 样品的次销售属性信息；常见的有size
      - **attribute_id** `string` — 次销售属性id
      - **attribute_value_id** `string` — 次销售属性值id
      - **attribute_value_name** `string` — 次销售属性的自定义属性值
  - **sample_judge_type** `integer` — 审版类型(2:大货样衣)，固定给2
  - **reserve_sample_flag** `integer` — 是否留样(1:是;2:否)，固定给2
  - **spot_flag** `integer` — 是否现货(1:是;2:否)

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
- **code** `string` **必填** — Result(success: 0)
- **info** `object`
  - **pre_valid_result** `object[]` — 校验结果描述
    - **form** `string` — 拦截原因所属的模块
    - **messages** `string[]` — 校验不通过原因
    - **module** `string` — 拦截原因所属的字段
  - **mcc_valid_result** `object[]` — 平台治理模块。
    - **message** `string` — message
    - **type** `integer` — 错误原因类型。1:预警;2:拦截
  - **filtered_result** `object[]` — 系统基于规则会过滤一些无效数据
    - **scene** `string` — 过滤场景
    - **message** `string` — 具体信息
  - **spu_name** `string` — 发布成功后返回spu_name，后续查询商品或编辑商品时均会使用。
  - **skc_list** `object[]` — skc list
    - **skc_name** `string` — 发布成功后返回skc_name
    - **sku_list** `object[]` — sku list
      - **sku_code** `string` — 发布成功后返回sku_code
      - **supplier_sku** `string` — supplier sku
  - **success** `boolean` — 校验结果 例: `0`
  - **version** `string` — 审核版本号。 对应查询审核状态接口中的入参version。
- **msg** `string` — Error description, success: OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/product/publishOrEdit' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752723623139' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "category_id": "20039882",
  "brand_code": "",
  "multi_language_desc_list": [
    {
      "language": "en",
      "name": "<p>Cool and comfortable for staying active on the go, our SLF Mesh Short are made from soft, lightweight mesh fabric that lets your skin breathe freely. The longer 9-inch leg length has room to cover up quickly if you need to, while wide side pockets make it easy to stash a phone or keys.</p>\n<p>The SLF Mesh Shorts add a fun flair to your wardrobe. Pair them with your favorite hoodie and some sneakers for an effortless look.</p>\n<p><b>Shorts Features</b></p>\n<ul>\n<li>Trendy style</li>\n<li>Lightweight mesh fabric</li>\n<li>Elastic stretch waistline</li>\n<li>Standard fit</li>\n<li>Side pockets</li>\n<li>Model is wearing size medium</li>\n</ul><br><br>Fulfilled by SLEEFS"
    }
  ],
  "multi_language_name_list": [
    {
      "language": "en",
      "name": "Amphibious Camo Shorts - 5\""
    }
  ],
  "site_list": [
    {
      "main_site": "shein",
      "sub_site_list": [
        "shein-fr"
      ]
    }
  ],
  "skc_list": [
    {
      "shelf_way": "1",
      "image_info": {
        "image_info_list": [
          {
            "image_sort": 1,
            "image_type": 1,
            "image_url": "https://imgdeal-test01.shein.com/images3_pi/2024/12/05/4d/17333665721070007089_square.jpeg"
          },
          {
            "image_sort": 2,
            "image_type": 2,
            "image_url": "https://imgdeal-test01.shein.com/images3_pi/2024/12/05/4d/17333665721070007089_square.jpeg"
          },
          {
            "image_sort": 3,
            "image_type": 5,
            "image_url": "https://imgdeal-test01.shein.com/images3_pi/2024/12/05/73/17333665751070007089.jpeg"
          },
          {
            "image_sort": 4,
            "image_type": 6,
            "image_url": "https://imgdeal-test01.shein.com/images3_pi/2024/12/05/ae/17333665792390132818.jpeg"
          }
        ]
      },
      "sale_attribute": {
        "attribute_id": 2147484187,
        "attribute_value_id": 2147488294
      },
      "skc_name": "",
      "sku_list": [
        {
          "mall_state": 1,
          "sku_code": "",
          "height": "20",
          "sale_attribute_list": [
            {
              "attribute_id": 2147484186,
              "attribute_value_id": 19884726
            }
          ],
          "stop_purchase": 1,
          "supplier_sku": "",
          "weight": 10,
          "width": "10",
          "length": "10"
        }
      ],
      "supplier_code": "54369dd1-68ef-4996-94b5-6486e584a5951"
    }
  ],
  "suggested_retail_price": {
    "currency": "USD",
    "price": 20
  },
  "suit_flag": 0,
  "spu_name": ""
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "success": true,
    "spu_name": "MM2412222464",
    "skc_list": [
      {
        "skc_name": "sMM24122224647569",
        "sku_list": [
          {
            "sku_code": "I7be1tn2tfoo",
            "supplier_sku": "sc_eu20241127001ss241113986146541TEST2"
          }
        ]
      }
    ],
    "version": "SPMP241222341208032",
    "pre_valid_result": null,
    "mcc_valid_result": null,
    "extra": {}
  },
  "bbl": null,
  "traceId": "3acb2f3aa7649de9"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002086。