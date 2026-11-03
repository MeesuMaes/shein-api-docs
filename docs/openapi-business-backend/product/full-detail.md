# sku商品详情查询（即将作废）

`POST /open-api/openapi-business-backend/product/full-detail`

**QPS**：60 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v31 ｜ **更新时间**：2025-05-06 16:08:52 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001085](https://open.sheincorp.com/documents/apidoc/detail/3001085)

## 接口说明

该API支持通过skucode查询sku详细信息，该接口目前暂停维护，请对接spu商品详情查询(新)接口，如需查询库存，请对接库存查询接口。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **skuCodes** `string[]` **必填** — skucode, 最大支持传100个，skucode是SHEIN生成的系统编码
- **language** `string` — 语种, 默认中文简体: zh-cn 支持语种:英语:en 法语:fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 响应参数

- **code** `string` — return code (0:success)
- **info** `object[]`
  - **skuCode** `string` **必填** — skuCode是SHEIN生成的系统编码
  - **spuName** `string` — spuName是SHEIN生成的系统编码
  - **skcName** `string` — skcName是SHEIN生成的系统编码, skc means stock keeping color, the sku by color is skc
  - **productName** `object` — 商品名称
    - **productName** `string` — 商品名称
    - **language** `string` — 语言
  - **productDesc** `object` — 商品描述
    - **productDesc** `string` — 商品描述
    - **language** `string` — 语言
  - **productNumber** `string` — 货号
  - **sellerSku** `string` — 商家sku
  - **goodsInventory** `object` — 商品库存
    - **inventoryQuantity** `integer` — 库存数；只返回部分备货到shein仓或不备货到shein仓的商品库存
    - **lockedQuantity** `integer` — 已销售未出库锁定库存数
    - **usableInventory** `integer` — 可用库存
    - **tempLockQuantity** `integer` — 已下单未支付锁定库存数
    - **warehouseInventoryList** `object[]` — 各仓库库存详情
      - **warehouseCode** `string` — 仓库编码
      - **warehouseType** `string` — 仓库类型
      - **inventoryQuantity** `integer` — 库存数;只返回部分备货到shein仓或不备货到shein仓的商品库存
      - **lockedQuantity** `integer` — 已销售未出库锁定库存数
      - **usableInventory** `integer` — 可用库存
      - **tempLockQuantity** `integer` — 已下单未支付锁定库存数
    - **skuCode** `string` — skucode，skucode是SHEIN生成的系统编码
  - **attributeLists** `object[]` — SKC属性
    - **attributeId** `long` — 属性ID
    - **attributeValueMulti** `object` — 属性值多语言
    - **attributeAdditionList** `object[]` — 属性附加列表
      - **additionAttrValueMulti** `object` — 语言
      - **additionValue** `string` — 属性名称(按语种返回，默认返回中文)
      - **additionAttrValueId** `string`
      - **additionAttrMulti** `object`
      - **additionAttrId** `string`
    - **attributeValueId** `string` — 属性值ID
    - **attributeMulti** `object` — 属性多语言
      - **language** `string` — 语言
      - **attributeMulti** `string` — 属性值(按语种返回，默认返回中文)
    - **attributeType** `string` — 属性类型
  - **skuAttributeLists** `object[]` — 商品sku属性
    - **attributeValueMulti** `object` — 属性值多语言
      - **attributeValueMulti** `string`
      - **language** `string`
    - **attributeValueId** `string` — 属性值ID(默认)
    - **attributeMulti** `object` — 属性名称(多语言）
      - **attributeMulti** `string`
      - **language** `string`
    - **attributeId** `string` — 属性id
  - **saleAttribute** `object` — 商品销售属性
    - **attributeValueMulti** `object` — 属性值多语言
      - **language** `string` — 语言
      - **attributeValueMulti** `string` — 属性值
    - **attributeId** `string` — 属性id
    - **attributeMulti** `object` — 属性名称(多语言）
      - **language** `string` — 语言
      - **attributeMulti** `string` — 属性名称
    - **attributeValueId** `string` — 属性值id
  - **currentPrices** `object[]` — 价格
    - **shopPrice** `double` — 商品原价
    - **specialPrice** `double` — 商品特价
    - **site** `string` — 站点
    - **specialPriceStart** `datetime` — 商品特价开始时间
    - **specialPriceEnd** `datetime` — 商品特价结束时间
    - **salePrice** `double` — 最终生效的价格，原价或者特价中的一个
    - **terminal** `string` — 所属渠道
    - **currency** `string` — 币种
    - **suggestedRetailPrice** `object` — 建议零售价信息
      - **srpPrice** `string` — 价格
      - **currency** `string` — 币种
    - **multiCurrencyCostList** `object[]` — 价格信息 /Price info
      - **cost** `string` — 供货价（代运营和半托管模式返回该数据）
      - **currency** `string` — 币种
  - **categoryName** `string` — 商品分类名称
  - **categoryId** `string` — 商品分类id
  - **imageList** `object[]` — 图片
    - **imageType** `string` — 图片类型such as: MAIN/DETAIL/SQUARE/PIECE
    - **sort** `integer` — 排序
    - **imageMediumUrl** `string` — 中等图图片链接
    - **imageSmallUrl** `string` — 小图链接
    - **imageUrl** `string` — 原图链接
    - **imageItemId** `long` — 图片id
    - **groupCode** `string` — 图片组编码
  - **skuDimensionsInfo** `object` — 尺寸属性
    - **length** `string` — 包装尺寸（长）(cm)
    - **width** `string` — 包装尺寸（宽）(cm)
    - **height** `string` — 包装尺寸（高）(cm)
    - **weight** `string` — 重量 （g）
  - **shelfDetails** `object[]` — 上下架信息
    - **isOnShelf** `boolean` — 是否上架 / is On Shelf，ture代表上架，false代表下架
    - **lastUpdateTime** `string` — 最近更新时间
    - **site** `string` — 站点
    - **stockMode** `string` — 销售状态,0:实际;1:虚拟
    - **isRecycled** `string`
  - **productTypeId** `string` — 商品类型
  - **brandCode** `string` — 商品品牌
  - **stopPurchase** `string` **必填** — 采购状态 1：可采 2：停采
  - **mallStateList** `object[]` **必填**
    - **mallState** `string` **必填** — SKU商城销售状态 1：在售 2：停售
  - **siteDetailImageInfoList** `object[]`
    - **imageGroupCode** `string` — 图片组编码
    - **imageInfoList** `object[]` — 详情图列表
      - **imageItemId** `long` — 图片id
      - **imageSort** `integer` — 图片排序
      - **imageUrl** `string` — 图片地址
    - **siteList** `object[]` — 站点列表
      - **channel** `string` — 渠道
      - **mainSite** `string` — 主站点
      - **site** `string` — 子站点
  - **proofOfStockList** `object[]` — 库存证明文件
    - **fileName** `string` — 库存证明文件名
    - **type** `integer` — 库存证明类型(1:图片;2:PDF)
    - **url** `string` — 库存证明文件地址
  - **competingProductLink** `string` — 竞品商品链接地址
  - **sampleInfo** `object` — 样品信息
    - **reserveSampleFlag** `string` — 是否留样，1:是，2:否
    - **spotFlag** `string` — 是否现货，1:是，2:否
    - **sampleJudgeType** `string` — 审版类型，2:大货样衣
    - **sampleCode** `string` — 样衣的平台商品code，只有主销售属性时返回skc_name，有次销售属性时返回sku_code
- **msg** `string` — error message
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/openapi-business-backend/product/full-detail' \
--header 'x-lt-signature: test0N2M2M2YyOGYxOTFjOTlhZTk1ZGJmZWEwY2VkNDA3NzM5MzgwNDVkNGMzODhhOTZlOTU1MWM3MWU5MTA4NzI2Mg==' \
--header 'x-lt-openKeyId: 6DF5F597AEF84494B42388C63F4632B3' \
--header 'x-lt-timestamp: 1692620638880' \
--header 'Content-Type: application/json;charset=UTF-8' \
--data-raw '{
    "skuCodes": [
        "I967uum2xi2q"
    ],
    "language": "en"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "spuName": "w2301056886",
      "categoryId": 2233,
      "categoryName": "大码毛衣半身裙",
      "skuDimensionsInfo": {
        "length": "12.00",
        "width": "12.00",
        "weight": "12",
        "height": "12.00"
      },
      "isSaleAttribute": 1,
      "productNumber": "123",
      "productTypeId": 1031,
      "skcName": "sw23010568863917",
      "skcCode": "O07f497x809b",
      "brandCode": "",
      "productName": {
        "language": "zh-cn",
        "productName": "商品测试详情图0626"
      },
      "goodsInventory": {
        "inventoryQuantity": 0,
        "lockedQuantity": 0,
        "tempLockQuantity": 0,
        "sellerSku": null,
        "usableInventory": 0,
        "skuCode": "I07f497xa731",
        "warehouseInventoryList": []
      },
      "shelfDetails": null,
      "productDesc": {
        "productDesc": "",
        "language": "zh-cn"
      },
      "currentPrices": [
        {
          "productCode": "I07f497xa731",
          "site": "shein-www",
          "shopPrice": 12,
          "currency": "USD",
          "terminal": null,
          "specialPrice": 12,
          "specialPriceStart": null,
          "salePrice": 12,
          "specialPriceEnd": null,
          "suggestedRetailPrice": null,
          "multiCurrencyCostList": [
            {
              "cost": 12,
              "currency": "CNY"
            }
          ]
        }
      ],
      "sellerSku": "",
      "imageList": [
        {
          "imageItemId": 4177814,
          "groupCode": "G3ck0j5himvq",
          "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/1672915851294102400.jpeg",
          "imageMediumUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/1672915851294102400_thumbnail_405x552.jpeg",
          "sort": 1,
          "imageSmallUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/1672915851294102400_thumbnail_220x293.jpeg",
          "imageType": "MAIN"
        },
        {
          "imageItemId": 2147510583,
          "groupCode": "G3ck0j5himvq",
          "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/26/16877583224104183094.jpg",
          "imageMediumUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/26/16877583224104183094_thumbnail_405x552.jpg",
          "sort": 2,
          "imageSmallUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/26/16877583224104183094_thumbnail_220x293.jpg",
          "imageType": "DETAIL"
        },
        {
          "imageItemId": 4177815,
          "groupCode": "G3ck0j5himvq",
          "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/16729158581743044934.jpeg",
          "imageMediumUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/16729158581743044934_thumbnail_405x552.jpeg",
          "sort": 3,
          "imageSmallUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/16729158581743044934_thumbnail_220x293.jpeg",
          "imageType": "SQUARE"
        },
        {
          "imageItemId": 4177816,
          "groupCode": "G3ck0j5himvq",
          "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/16729158633401920931.jpeg",
          "imageMediumUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/16729158633401920931_thumbnail_405x552.jpeg",
          "sort": 4,
          "imageSmallUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/01/05/16729158633401920931_thumbnail_220x293.jpeg",
          "imageType": "PIECE"
        }
      ],
      "skuCode": "I07f497xa731",
      "attributeLists": [
        {
          "attributeValueMulti": {
            "attributeValueMulti": "否",
            "language": "zh-cn"
          },
          "attributeAdditionList": [],
          "attributeId": 9,
          "attributeMulti": {
            "attributeMulti": "腰带修改属性名",
            "language": "zh-cn"
          },
          "attributeType": 4,
          "attributeValueId": 459
        },
        {
          "attributeValueMulti": {
            "attributeValueMulti": "雨靴",
            "language": "zh-cn"
          },
          "attributeAdditionList": [],
          "attributeId": 1000455,
          "attributeMulti": {
            "attributeMulti": "关务种类",
            "language": "zh-cn"
          },
          "attributeType": 4,
          "attributeValueId": 1002593
        }
      ],
      "saleAttribute": {
        "attributeValueMulti": {
          "attributeValueMulti": "S",
          "language": "zh-cn"
        },
        "attributeId": 87,
        "attributeMulti": {
          "attributeMulti": "尺寸",
          "language": "zh-cn"
        },
        "attributeValueId": 568
      },
      "skuAttributeLists": [
        {
          "attributeValueMulti": {
            "attributeValueMulti": "高腰",
            "language": "zh-cn"
          },
          "attributeId": 1000253,
          "attributeMulti": {
            "attributeMulti": "腰高",
            "language": "zh-cn"
          },
          "attributeValueId": 1001537
        }
      ],
      "stopPurchase": 1,
      "mallStateList": [
        {
          "mallState": 1
        }
      ],
      "siteDetailImageInfoList": [
        {
          "imageGroupCode": "G4101b6x0x2q",
          "imageInfoList": [
            {
              "imageItemId": 1147525967,
              "imageSort": 1,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/16878497173382906927.jpg"
            },
            {
              "imageItemId": 1147525968,
              "imageSort": 2,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/1687849716132016602.jpg"
            },
            {
              "imageItemId": 1147525969,
              "imageSort": 3,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/16878497172100198531.jpg"
            },
            {
              "imageItemId": 1147525972,
              "imageSort": 4,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/16878497171538544330.jpg"
            },
            {
              "imageItemId": 1147525970,
              "imageSort": 5,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/168784971786427267.jpg"
            },
            {
              "imageItemId": 1147525973,
              "imageSort": 6,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/16878497172692858196.jpg"
            },
            {
              "imageItemId": 1147525971,
              "imageSort": 7,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/16878497171257169109.jpg"
            },
            {
              "imageItemId": 1147525974,
              "imageSort": 8,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/1687849717267425053.jpg"
            },
            {
              "imageItemId": 1147525966,
              "imageSort": 9,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/16878497172530412707.jpg"
            },
            {
              "imageItemId": 1147525975,
              "imageSort": 10,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/16878497181300119333.jpg"
            }
          ],
          "siteList": [
            {
              "channel": "",
              "mainSite": "rw",
              "site": "rw-fr"
            }
          ]
        },
        {
          "imageGroupCode": "G1gn3ar0kuri",
          "imageInfoList": [
            {
              "imageItemId": 1147525978,
              "imageSort": 1,
              "imageUrl": "http://imgdeal-test01.shein.com/images3_pi/2023/06/27/16878503612266741411.jpg"
            }
          ],
          "siteList": [
            {
              "channel": "",
              "mainSite": "shein",
              "site": "shein-roe"
            },
            {
              "channel": "",
              "mainSite": "shein",
              "site": "shein-euqs"
            },
            {
              "channel": "",
              "mainSite": "shein",
              "site": "shein-uk"
            },
            {
              "channel": "",
              "mainSite": "shein",
              "site": "shein-ca"
            },
            {
              "channel": "",
              "mainSite": "shein",
              "site": "shein-ma"
            }
          ]
        }
      ],
      "proofOfStockList": null,
      "sampleInfo": {
        "reserveSampleFlag": 0,
        "sampleCode": "",
        "spotFlag": 0,
        "sampleJudgeType": 2
      },
      "competingProductLink": null
    }
  ]
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001085。