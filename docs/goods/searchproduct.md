# 商品综合查询

`POST /open-api/goods/searchProduct`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v5 ｜ **更新时间**：2026-08-03 10:41:33 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001938](https://open.sheincorp.com/documents/apidoc/detail/3001938)

## 接口说明

商品列表接口，支持使用各种条件综合查询，查询结果按SPU维度提供，每个SPU下会提供商品的关键信息。
支持的条件：平台编码、商家维护货号、上架状态、类目、发布时间和更新时间；各条件间是且的关系。
返回的信息：各层级的编码和货号、标题属性、主图、上架状态、价格、库存、营销活动锁。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` **必填** — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **pageNum** `integer` **必填** — 分页页码，从1开始 例: `1`
- **pageSize** `integer` **必填** — 分页大小，最大10 例: `20`
- **categoryIds** `int64[]` — 末级分类ID列表，单次最多10个。
- **spuNameList** `string[]` — SPU编码列表（平台编码），单次最多10个。
- **skcNameList** `string[]` — SKC编码列表（平台编码），单次最多10个。
- **skuCodeList** `string[]` — SKU编码列表（平台编码），单次最多10个。
- **skcSupplierCodeList** `string[]` — SKC货号列表（商家维护的货号），单次最多10个。
- **supplierSkuList** `string[]` — 商家SKU列表（商家维护的SKU货号），单次最多10个
- **skcShelfStatus** `integer` — SKC上架状态，0:下架 1:上架。 待上架和已售罄均属于下架状态。 例: `1`
- **languageList** `string[]` — 语种列表，决定商品信息中名称、属性名称、属性值名称返回的语种内容。单次最多入参5个语种，不传时默认返回英语。 支持的语种包括：英语:en、法语:fr、西班牙语:es、德语:de、中文简体:zh-cn、泰语:th、巴西葡语:pt-br、日语:ja、韩语:ko
- **createTimeStart** `string` — SPU的发布时间段（开始时间），格式 yyyy-MM-dd HH:mm:ss。 发布时间定义：SPU首次审核通过时间。 例: `2024-01-01 00:00:00`
- **createTimeEnd** `string` — SPU的发布时间段（结束时间），格式 yyyy-MM-dd HH:mm:ss。 发布时间定义：SPU首次审核通过时间。 例: `2024-12-31 23:59:59`
- **updateTimeEnd** `string` — SPU的更新时间段（结束时间），格式 yyyy-MM-dd HH:mm:ss。 更新时间定义：SPU下任意SKC的标题、品牌、IP、属性变更导致的更新。不包括价格、库存的更新。 例: `2024-12-31 23:59:59`
- **updateTimeStart** `string` — SPU的更新时间段（开始时间），格式 yyyy-MM-dd HH:mm:ss。 更新时间定义：SPU下任意SKC的标题、品牌、IP、属性变更导致的更新。不包括价格、库存的更新。 例: `2024-01-01 00:00:00`

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 查询结果
  - **meta** `object` — 分页元信息
    - **count** `integer` — 符合查询条件的SPU数量
  - **data** `object[]` — SPU列表。默认按SPU发布时间降序排序。
    - **spuName** `string` — spu编码，平台生成的编码
    - **spuShelfStatus** `integer` — SPU的上架状态，0:下架 1:上架。 待上架和已售罄均属于下架状态。
    - **categoryId** `string` — 末级类目ID
    - **skcList** `object[]` — SKC列表
      - **skcName** `string` — SKC的平台编码
      - **skcShelfStatus** `integer` — SKC上架状态，0:下架 1:上架。 待上架和已售罄均属于下架状态。
      - **supplierCode** `string` — SKC的商家货号
      - **skcMainPicUrl** `string` — SKC主图URL
      - **skcTitle** `object[]` — SKC标题列表
        - **language** `string` — 语种。返回的语种取决于入参中的languageList
        - **title** `string` — 标题内容
      - **skcSalesAttribute** `object[]` — SKC销售属性列表
        - **language** `string` — 语种。返回的语种取决于入参中的languageList
        - **attributeId** `string` — 属性ID
        - **attributeName** `string` — 属性名称
        - **attributeValueId** `string` — 属性值ID
        - **attributeValueName** `string` — 属性值名称
      - **skcSiteShelfStatusList** `object[]` — SKC的站点维度上架状态。
        - **status** `integer` — 上架状态，0:下架 1:上架。
        - **subSite** `string` — 子站点，例如shein-us
      - **activityLockList** `object[]` — SKC的各站点营销活动锁定状态。 商品参加营销活动后，根据活动要求，会出现无法下架、无法涨价的情况。可通过此字段来判断商品当前能否下架、能否涨价。
        - **site** `string` — 站点。 SKC按站点维度参加营销活动。
        - **shelfLockType** `integer` — 下架锁。即SKC在此站点能否发起下架。 0=无锁，即可下架。当SKC没有参加活动，或参加活动但活动允许下架时会出现0。 1=锁定，即不可下架。大多是因为参加的营销活动已启动，活动期间不允许下架。
        - **priceLockType** `integer` — 涨价锁。即SKC在此站点能否发起调高销售价/成本价。 0=无锁，即无限制。当SKC没有参加活动，或参加活动但活动允许调价时会出现0。 1=不可涨价但可降价（强校验）。即不允许涨价，涨价就会拦截。 2=不可涨价但可降价（仅提醒）。即平台建议不要涨价，涨价不会拦截，但视情况会影响活动效果。
      - **skuList** `object[]` — SKU列表
        - **skuCode** `string` — SKU的平台编码
        - **supplierSku** `string` — 商家维护的SKU，即发布接口中的supplier_sku
        - **skuSalesAttributeList** `object[]` — SKU销售属性列表。如果列表为空，说明商品没有次规格属性。
          - **language** `string` — 语种。返回的语种取决于入参中的languageList
          - **attributeId** `string` — 属性ID
          - **attributeName** `string` — 属性名称
          - **attributeValueId** `string` — 属性值ID
          - **attributeValueName** `string` — 属性值名称
        - **costList** `object[]` — 成本价列表。仅半托管/全托管模式商家会返回此数据
          - **cost** `double` — 金额
          - **currency** `string` — 币种
        - **priceList** `object[]` — 售价列表。仅自运营商家返回此数据
          - **site** `string` — 站点。例如shein-us
          - **currency** `string` — 币种
          - **basePrice** `double` — 原价
          - **specialPrice** `double` — 特价。特价=0，代表商家发布商品时没有维护特价。特价为0时可视为无特价。
        - **inventoryList** `object[]` — 库存列表。如果为空，则说明商品在任一仓库都没有维护库存数据
          - **warehouseId** `string` — 仓库ID
          - **inventoryNum** `integer` — 库存数量
- **traceId** `string` — 请求跟踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/searchProduct' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1774494443833' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "pageSize":10,
    "pageNum":1,
    "skcNameList":["sw23042063320557"]

}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "meta": {
      "count": 1
    },
    "data": [
      {
        "spuName": "w2304206332",
        "spuShelfStatus": 0,
        "categoryId": "10002",
        "skcList": [
          {
            "skcName": "sw23042063320557",
            "skcTitle": [
              {
                "language": "en",
                "title": "eneneen"
              }
            ],
            "skcMainPicUrl": "https://imgdeal-test01.shein.com/gspCenter/goodsImage/2023/4/20/9665153079_3391/00ddda60-49c1-4dcc-97fc-64b7209fb40d/CFAEBCC43CE562702A33ED4147F76DDB.jpg",
            "skcSalesAttribute": [
              {
                "language": "en",
                "attributeId": "27",
                "attributeName": "Color",
                "attributeValueId": "81",
                "attributeValueName": "Army Green"
              }
            ],
            "supplierCode": "无次规格1",
            "skcShelfStatus": 0,
            "skcSiteShelfStatusList": [
              {
                "subSite": "shein-us",
                "status": 0
              },
              {
                "subSite": "shein-order",
                "status": 0
              },
              {
                "subSite": "shein-es",
                "status": 0
              },
              {
                "subSite": "shein-br",
                "status": 0
              },
              {
                "subSite": "shein-tw",
                "status": 0
              }
            ],
            "activityLockList": [
              {
                "site": "shein-es",
                "shelfLockType": 0,
                "priceLockType": 0
              },
              {
                "site": "shein-tw",
                "shelfLockType": 0,
                "priceLockType": 0
              },
              {
                "site": "shein-us",
                "shelfLockType": 1,
                "priceLockType": 1
              },
              {
                "site": "shein-br",
                "shelfLockType": 1,
                "priceLockType": 1
              }
            ],
            "skuList": [
              {
                "skuCode": "I9e875z5s7gf",
                "supplierSku": "",
                "skuSalesAttributeList": [],
                "priceList": [],
                "costList": null,
                "inventoryList": []
              }
            ]
          },
          {
            "skcName": "sw23042063321599",
            "skcTitle": [
              {
                "language": "en",
                "title": "eneneen"
              }
            ],
            "skcMainPicUrl": "https://imgdeal-test01.shein.com/gspCenter/goodsImage/2023/4/20/9665153079_3391/c362f455-9a43-4003-a8a9-23694958af78/F6E59AE75DFC46F64D3A1C3C063A7509.jpg",
            "skcSalesAttribute": [
              {
                "language": "en",
                "attributeId": "27",
                "attributeName": "Color",
                "attributeValueId": "78",
                "attributeValueName": "Apricot"
              }
            ],
            "supplierCode": "无次规格1",
            "skcShelfStatus": 0,
            "skcSiteShelfStatusList": [
              {
                "subSite": "shein-us",
                "status": 0
              },
              {
                "subSite": "shein-order",
                "status": 0
              },
              {
                "subSite": "shein-es",
                "status": 0
              },
              {
                "subSite": "shein-br",
                "status": 0
              },
              {
                "subSite": "shein-tw",
                "status": 0
              }
            ],
            "activityLockList": [
              {
                "site": "shein-es",
                "shelfLockType": 0,
                "priceLockType": 0
              },
              {
                "site": "shein-tw",
                "shelfLockType": 0,
                "priceLockType": 0
              },
              {
                "site": "shein-us",
                "shelfLockType": 0,
                "priceLockType": 0
              },
              {
                "site": "shein-br",
                "shelfLockType": 0,
                "priceLockType": 0
              }
            ],
            "skuList": [
              {
                "skuCode": "I9e875z5oj6a",
                "supplierSku": "",
                "skuSalesAttributeList": [],
                "priceList": [],
                "costList": null,
                "inventoryList": []
              }
            ]
          },
          {
            "skcName": "sw23042063328616",
            "skcTitle": [
              {
                "language": "en",
                "title": "eneneen"
              }
            ],
            "skcMainPicUrl": "https://imgdeal-test01.shein.com/gspCenter/goodsImage/2023/4/20/9665153079_3391/8bfeccdc-72b1-4743-a78c-8142100970de/A77FFFBB07BDFBF7FA97E59A08D62421.jpg",
            "skcSalesAttribute": [
              {
                "language": "en",
                "attributeId": "27",
                "attributeName": "Color",
                "attributeValueId": "103",
                "attributeValueName": "Beige"
              }
            ],
            "supplierCode": "无次规格1",
            "skcShelfStatus": 0,
            "skcSiteShelfStatusList": [
              {
                "subSite": "shein-us",
                "status": 0
              },
              {
                "subSite": "shein-order",
                "status": 0
              },
              {
                "subSite": "shein-es",
                "status": 0
              },
              {
                "subSite": "shein-br",
                "status": 0
              },
              {
                "subSite": "shein-tw",
                "status": 0
              }
            ],
            "activityLockList": [
              {
                "site": "shein-es",
                "shelfLockType": 0,
                "priceLockType": 0
              },
              {
                "site": "shein-tw",
                "shelfLockType": 0,
                "priceLockType": 0
              },
              {
                "site": "shein-us",
                "shelfLockType": 0,
                "priceLockType": 1
              },
              {
                "site": "shein-br",
                "shelfLockType": 0,
                "priceLockType": 1
              }
            ],
            "skuList": [
              {
                "skuCode": "I9e875z5umbq",
                "supplierSku": "",
                "skuSalesAttributeList": [],
                "priceList": [],
                "costList": null,
                "inventoryList": []
              }
            ]
          }
        ]
      }
    ]
  },
  "traceId": "4aede655aea7d5d2"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001938。