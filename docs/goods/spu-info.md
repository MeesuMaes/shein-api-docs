# spu商品详情查询

`POST /open-api/goods/spu-info`

**QPS**：100 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v30 ｜ **更新时间**：2026-11-03 10:22:49 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002017](https://open.sheincorp.com/documents/apidoc/detail/3002017)

## 接口说明

支持通过SPU查询商品信息。只有发布且已通过平台审核的SPU才能查到信息。
可查信息：SPU/SKC/SKU维度品牌、名称、图片、属性、上架状态、价格、样品信息。
不可查询信息：商品库存、属性排序。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **languageList** `string[]` **必填** — 语种列表。指的是商品名称、商品描述、属性名称会返回哪些语种信息。建议入参商家的默认语种，确保能拿到有效数据，默认语种通过商品发布规范获取。 最多可给5个语种，可用的语种：简体中文：zh-cn、英语：en、西班牙语：es、法语：fr、德语：de、意大利语：it、巴西葡萄牙语：pt-BR、葡萄牙葡萄牙语：pt-PT、波兰语：pl、土耳其语：tr、阿拉伯语：ar、韩语：ko、日语：ja、瑞典语：sv
- **spuName** `string` **必填** — 平台生成的唯一编码。商品发布时会返回，或通过商品列表接口获取。只有发布且已通过平台审核的SPU才能查到信息。

## 响应参数

- **bbl** `object` — bbl info
  - **info** `object`
    - ***** `object[]`
- **code** `string` **必填** — success:0
- **info** `object` — 商品详情
  - **brandCode** `string` — 品牌code
  - **categoryId** `int64` — 末级分类id
  - **ipCharacterList** `object[]` — IP列表（目前1个商品只有1个IP）
    - **ipCharacterId** `int64` — IP id
    - **ipCharacterName** `string` — ip名称（英文）
    - **ipCharacterNameCn** `string` — ip名称（中文）
  - **dimensionAttributeInfoList** `object[]` — 尺寸属性（尺码表）。 对应商品发布接口中的：size_attribute_list。
    - **attributeId** `int64` — 属性ID
    - **attributeMultiList** `object[]` — 属性ID的名称（包含多语言）。 仅返回请求体中languageList中给出的语种。
      - **attributeName** `string` — 属性名称
      - **language** `string` — 语种
    - **dimensionAttributeAdditionList** `object[]` — 尺码属性的手动输入值。 对应商品发布接口中size_attribute_list -> attribute_extra_value。
      - **additionValue** `string` — 手动输入值
      - **relateSaleAttributeId** `int64` — 尺码属性关联的销售属性ID
      - **relateSaleAttributeValueId** `int64` — 尺码属性关联的销售属性值ID
  - **productAttributeInfoList** `object[]` — 商品属性列表。 对应商品发布接口中的product_attribute_list（仅可入参attribute_type=3/4）。注意：此列表中包含了attribute_type=3/4（商品属性）、attribute_type=1（销售属性）信息。开发者需主动剔除下方skc/sku的销售属性，才能获得准确的商品属性。
    - **attributeId** `int64` — 属性ID
    - **attributeMultiList** `object[]` — 属性ID的多语言名称。 仅返回请求体中languageList中给出的语种。
      - **attributeName** `string` — 属性名称
      - **language** `string` — 语种
    - **attributeValue** `string` — 属性值（手动输入类型）。 对应商品发布接口的product_attribute_list -> attribute_extra_value。
    - **attributeValueId** `int64` — 属性值ID（下拉选择类型）。 对应商品发布接口的product_attribute_list -> attribute_value_id。
    - **attributeValueMultiList** `object[]` — 属性值的多语言名称。 仅返回请求体中languageList中给出的语种。
      - **attributeValueName** `string` — 属性值名称
      - **language** `string` — 语种
  - **productMultiDescList** `object[]` — 商品多语言描述。 仅返回请求体中languageList中给出的语种。
    - **language** `string` — 语种
    - **productDesc** `string` — 商品描述
  - **productMultiNameList** `object[]` — 商品多语言名称。 仅返回请求体中languageList中给出的语种。
    - **language** `string` — 语种
    - **productName** `string` — 商品名称
  - **productVideoList** `object[]` — 商品视频信息列表
    - **site** `string` — 站点
    - **videoSourceUrl** `string` — 视频链接
  - **productTypeId** `int64` — 商品类型ID
  - **skcInfoList** `object[]` — SKC明细信息
    - **attributeId** `int64` — SKC销售属性ID
    - **attributeMultiList** `object[]` — SKC销售属性多语言名称。 仅返回请求体中languageList中给出的语种。
      - **attributeName** `string` — 属性名称
      - **language** `string` — 语种
    - **attributeValueId** `int64` — SKC销售属性值ID
    - **attributeValueMultiList** `object[]` — SKC销售属性值多语言名称。 仅返回请求体中languageList中给出的语种。
      - **attributeValueName** `string` — 属性值名称
      - **language** `string` — 语种
    - **productMultiNameList** `object[]` — SKC维度的商品名称多语言。 仅返回请求体中languageList中给出的语种。
      - **language** `string` — 语种
      - **productName** `string` — 商品名称
    - **proofOfStockInfoList** `object[]` — 库存证明文件信息
      - **fileName** `string` — 文件名称
      - **type** `integer` — 文件类型，1-图片 2-PDF
      - **url** `string` — 文件链接
    - **shelfStatusInfoList** `object[]` — 上下架信息
      - **firstShelfTime** `datetime` — 首次上架时间
      - **lastShelfTime** `datetime` — 最近上架时间
      - **lastUpdateTime** `datetime` — 最近更新时间
      - **shelfStatus** `integer` — 上下架状态:0下架;1上架
      - **siteAbbr** `string` — 站点
    - **recycleInfoList** `object[]` — 回收站状态信息
      - **recycleStatus** `integer` — 回收站状态:0未回收，1已回收
      - **subSite** `string` — 子站点
    - **siteDetailImageInfoList** `object[]` — SKC站点详情图列表。 对应商品发布接口中的site_detail_image_info_list
      - **imageGroupCode** `string` — 图片组编码
      - **imageInfoList** `object[]` — 详情图列表
        - **imageItemId** `int64` — 图片ID
        - **imageSort** `integer` — 图片顺序
        - **imageUrl** `string` — 图片URL
      - **siteInfoList** `object[]` — 详情图站点信息列表
        - **channel** `string` — 渠道
        - **mainSite** `string` — 主站
        - **site** `string` — 子站
    - **sampleInfo** `object` — 样品信息
      - **reserveSampleFlag** `integer` — 是否需留样(1是 2否)
      - **sampleJudgeType** `integer` — 审版类型
      - **sampleCode** `string` — 样衣SKU
      - **spotFlag** `integer` — 是否现货(1是 2否)
    - **skcImageInfoList** `object[]` — SKC图片列表。 对应商品发布接口的skc_list -> image_info。
      - **groupCode** `string` — 图片组编码
      - **imageItemId** `int64` — 图片ID
      - **imageMediumUrl** `string` — 中图链接
      - **imageSmallUrl** `string` — 小图链接
      - **imageType** `string` — 图片类型
      - **imageUrl** `string` — 原图链接
      - **sort** `integer` — 图片排序
    - **skcName** `string` — skcName，skcName是SHEIN生成的系统编码
    - **skuInfoList** `object[]` — sku信息列表
      - **height** `string` — 含包装的尺寸：高(cm) 此字段输出的是cm单位下的数值。如果需要换算成其他单位，可参考： https://open.sheincorp.com/documents/faq-detail/292
      - **length** `string` — 含包装的尺寸：长(cm) 此字段输出的是cm单位下的数值。如果需要换算成其他单位，可参考： https://open.sheincorp.com/documents/faq-detail/292
      - **mallState** `integer` — 商城销售状态，1-在售 2-停售
      - **stopPurchase** `integer` — 采购状态，1-在采 2-停采
      - **saleAttributeList** `object[]` — SKU销售属性列表
        - **attributeId** `int64` — SKU销售属性ID
        - **attributeValueId** `int64` — SKU销售属性值ID
        - **attributeValueMultiList** `object[]` — SKU销售属性值多语言名称。 仅返回请求体中languageList中给出的语种。
          - **attributeValueName** `string` — 属性值名称
          - **language** `string` — 语种
      - **productSkuAttributeList** `object[]` — sku的普通属性列表（attribute_type=3/4）
        - **attributeId** `int64` — 属性ID
        - **attributeMultiList** `object[]` — 属性ID多语言名称
          - **attributeName** `string` — 属性名
          - **language** `string` — 语种
        - **attributeType** `integer` — 属性类型
        - **attributeValueId** `int64` — 属性值id
        - **attributeValueMultiList** `object[]` — 属性值多语言名称
          - **attributeValueName** `string` — 属性值名称
          - **language** `string` — 语种
        - **additionValue** `string` — 属性值（手动输入值）
      - **priceInfoList** `object[]` — 售价信息列表
        - **basePrice** `double` — 原价
        - **currency** `string` — 币种
        - **site** `string` — 子站点
        - **specialPrice** `double` — 特价
      - **skuCode** `string` — skuCode，skuCode是SHEIN生成的系统编码
      - **skuImageInfoList** `object` — sku图片组信息
        - **groupCode** `string` — 图片组编码
        - **imageItemId** `int64` — 图片ID
        - **imageMediumUrl** `string` — 中图链接
        - **imageSmallUrl** `string` — 小图链接
        - **imageType** `string` — 图片类型
        - **imageUrl** `string` — 原图链接
        - **sort** `integer` — 图片排序
      - **costInfoList** `object[]` — 供货价信息列表
        - **costPrice** `double` — 供货价
        - **currency** `string` — 币种
      - **skuSupplierInfo** `object` — sku供应信息
        - **supplierBarcodeEnabled** `boolean` — 是否启用供应条码
        - **supplierBarcodeList** `object[]` — 商家条码列表
          - **barcode_list** `string[]` — 条码列表
          - **barcode_type** `string` — 条码类型:EAN、UPC
      - **supplierSku** `string` — 卖家SKU，创建商品时需要商家维护。
      - **weight** `integer` — 含包装的尺寸：重量(g)。 此字段输出的是g单位下的重量。如果需要换算成其他单位，可参考： https://open.sheincorp.com/documents/faq-detail/292
      - **width** `string` — 含包装的尺寸：宽(cm) 此字段输出的是cm单位下的数值。如果需要换算成其他单位，可参考： https://open.sheincorp.com/documents/faq-detail/292
      - **quantityType** `integer` — 件数类型。1-单件 2-同品多件
      - **quantityUnit** `integer` — 件数单位。1-件 2-双
      - **quantity** `integer` — 件数值
      - **packageType** `integer` — 包装类型 0-空 1-软包装+软物 2-软包装+硬物 3-硬包装 4-真空
    - **srpPriceInfo** `object` — 建议零售价信息
      - **currency** `string` — 币种
      - **srpPrice** `double` — 建议零售价
    - **supplierCode** `string` — 卖家SKC编码，创建商品时需要商家维护，没有维护则不返回
  - **spuName** `string` — spuName，spuName是SHEIN生成的系统编码
  - **spuImageInfoList** `object` — spu图片列表。 对应商品发布接口中的最外层image_info。
    - **groupCode** `string` — 图片组编码
    - **imageItemId** `int64` — 图片ID
    - **imageMediumUrl** `string` — 中图链接
    - **imageSmallUrl** `string` — 小图链接
    - **imageType** `string` — 图片类型
    - **imageUrl** `string` — 图片链接
    - **sort** `string` — 图片排序
  - **supplierCode** `string` — 卖家SPU编码，创建商品时需要商家维护，没有维护则不返回
- **msg** `string` — message, success:OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/spu-info' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752732946244' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "languageList": [
        "zh-cn"],
    "spuName": "MM2404163183"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "spuName": "MM2404163183",
    "categoryId": 1980,
    "productTypeId": 71,
    "brandCode": "",
    "supplierCode": "openapimx",
    "productMultiNameList": [
      {
        "productName": "Produto De Teste Openapi Mx custom valuesdsd",
        "language": "zh-cn"
      }
    ],
    "productMultiDescList": [
      {
        "productDesc": "",
        "language": "zh-cn"
      }
    ],
    "productAttributeInfoList": [
      {
        "attributeId": 40,
        "attributeMultiList": [
          {
            "attributeName": "适合类型",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 132,
        "attributeValueMultiList": [
          {
            "attributeValueName": "男朋友",
            "language": "zh-cn"
          }
        ],
        "attributeValue": null
      },
      {
        "attributeId": 39,
        "attributeMultiList": [
          {
            "attributeName": "面料弹性-id39",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 279,
        "attributeValueMultiList": [
          {
            "attributeValueName": "面料无弹性.",
            "language": "zh-cn"
          }
        ],
        "attributeValue": null
      },
      {
        "attributeId": 54,
        "attributeMultiList": [
          {
            "attributeName": "长度（54）",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 408,
        "attributeValueMultiList": [
          {
            "attributeValueName": "长款",
            "language": "zh-cn"
          }
        ],
        "attributeValue": null
      },
      {
        "attributeId": 90,
        "attributeMultiList": [
          {
            "attributeName": "袖长id90",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 409,
        "attributeValueMultiList": [
          {
            "attributeValueName": "长袖",
            "language": "zh-cn"
          }
        ],
        "attributeValue": null
      },
      {
        "attributeId": 87,
        "attributeMultiList": [
          {
            "attributeName": "尺寸",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 756,
        "attributeValueMultiList": [
          {
            "attributeValueName": "XXL",
            "language": "zh-cn"
          }
        ],
        "attributeValue": null
      },
      {
        "attributeId": 58,
        "attributeMultiList": [
          {
            "attributeName": "是否带里衬58",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 1001808,
        "attributeValueMultiList": [
          {
            "attributeValueName": "无内衬",
            "language": "zh-cn"
          }
        ],
        "attributeValue": null
      },
      {
        "attributeId": 87,
        "attributeMultiList": [
          {
            "attributeName": "尺寸",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 2147484569,
        "attributeValueMultiList": [
          {
            "attributeValueName": "323分",
            "language": "zh-cn"
          }
        ],
        "attributeValue": null
      },
      {
        "attributeId": 27,
        "attributeMultiList": [
          {
            "attributeName": "颜色",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 2147484570,
        "attributeValueMultiList": [
          {
            "attributeValueName": "黑色434",
            "language": "zh-cn"
          }
        ],
        "attributeValue": null
      }
    ],
    "dimensionAttributeInfoList": [],
    "spuImageInfoList": null,
    "skcInfoList": [
      {
        "skcName": "sMM24041631833322",
        "supplierCode": "openapimx",
        "sampleInfo": {
          "sampleCode": "",
          "reserveSampleFlag": 0,
          "spotFlag": 0,
          "sampleJudgeType": 2
        },
        "productMultiNameList": [
          {
            "productName": "Produto De Teste Openapi Mx custom valuesdsd",
            "language": "zh-cn"
          }
        ],
        "attributeId": 27,
        "attributeMultiList": [
          {
            "attributeName": "颜色",
            "language": "zh-cn"
          }
        ],
        "attributeValueId": 2147484570,
        "attributeValueMultiList": [
          {
            "attributeValueName": "黑色434",
            "language": "zh-cn"
          }
        ],
        "skuInfoList": [
          {
            "skuCode": "I05xh21a82o5",
            "supplierSku": "black-XXL",
            "length": "11.00",
            "width": "11.00",
            "height": "11.00",
            "weight": 222,
            "mallState": 1,
            "stopPurchase": 1,
            "saleAttributeList": [
              {
                "attributeId": 87,
                "attributeValueId": 756,
                "attributeValueMultiList": [
                  {
                    "attributeValueName": "XXL",
                    "language": "zh-cn"
                  }
                ]
              }
            ],
            "priceInfoList": [
              {
                "site": "shein-mx",
                "basePrice": 23,
                "specialPrice": 0,
                "currency": "MXN"
              }
            ],
            "costInfoList": [],
            "skuImageInfoList": null
          },
          {
            "skuCode": "I05xh21am74l",
            "supplierSku": "black-323分",
            "length": "11.00",
            "width": "11.00",
            "height": "11.00",
            "weight": 222,
            "mallState": 1,
            "stopPurchase": 1,
            "saleAttributeList": [
              {
                "attributeId": 87,
                "attributeValueId": 2147484569,
                "attributeValueMultiList": [
                  {
                    "attributeValueName": "323分",
                    "language": "zh-cn"
                  }
                ]
              }
            ],
            "priceInfoList": [
              {
                "site": "shein-mx",
                "basePrice": 333,
                "specialPrice": 0,
                "currency": "MXN"
              }
            ],
            "costInfoList": [],
            "skuImageInfoList": null
          }
        ],
        "shelfStatusInfoList": [
          {
            "siteAbbr": "shein-mx",
            "shelfStatus": 0,
            "lastShelfTime": "2018-08-28 00:00:00",
            "firstShelfTime": "1970-01-01 08:00:01",
            "lastUpdateTime": "2024-04-18 19:44:38"
          }
        ],
        "skcImageInfoList": [
          {
            "groupCode": "G772lhlxbqpk",
            "imageItemId": 2147571028,
            "imageType": "MAIN",
            "imageMediumUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/1b/17132456933631648684_thumbnail_405x552.jpg",
            "imageSmallUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/1b/17132456933631648684_thumbnail_220x293.jpg",
            "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/1b/17132456933631648684.jpg",
            "sort": 1
          },
          {
            "groupCode": "G772lhlxbqpk",
            "imageItemId": 2147571029,
            "imageType": "DETAIL",
            "imageMediumUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/54/17132456951187015405_thumbnail_405x552.jpg",
            "imageSmallUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/54/17132456951187015405_thumbnail_220x293.jpg",
            "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/54/17132456951187015405.jpg",
            "sort": 2
          },
          {
            "groupCode": "G772lhlxbqpk",
            "imageItemId": 2147571030,
            "imageType": "SQUARE",
            "imageMediumUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/dc/17132457012319655615_thumbnail_405x552.jpg",
            "imageSmallUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/dc/17132457012319655615_thumbnail_220x293.jpg",
            "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/dc/17132457012319655615.jpg",
            "sort": 3
          },
          {
            "groupCode": "G772lhlxbqpk",
            "imageItemId": 2147571031,
            "imageType": "PIECE",
            "imageMediumUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/dc/17132457012755121747_thumbnail_405x552.jpg",
            "imageSmallUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/dc/17132457012755121747_thumbnail_220x293.jpg",
            "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2024/04/16/dc/17132457012755121747.jpg",
            "sort": 4
          }
        ],
        "siteDetailImageInfoList": null,
        "proofOfStockInfoList": [],
        "srpPriceInfo": null
      }
    ]
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002090。