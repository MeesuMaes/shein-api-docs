# 查询商品备货信息列表

`POST /open-api/openapi-business-backend/stock-goods-list`

**QPS**：40 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v6 ｜ **更新时间**：2026-10-19 15:08:19 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment)、[备货申请](/packages/stock-request) ｜ **官方文档**：[3002062](https://open.sheincorp.com/documents/apidoc/detail/3002062)

## 接口说明

通过该接口获取商品备货相关信息。该接口主要适用全托管模式，备货到SHEIN仓库的商家，如果商家没有数据权限，会返回“不符合对外规则”。
该接口仅支持查询SHEIN商家后台，“备货信息”页面的数据。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **pageNum** `integer` — 页码；默认1；
- **pageSize** `integer` — 每页数量；默认20；MAX：20；
- **skcList** `string[]` — 填写skc列表
- **supplierCodeList** `string[]` — 填写供方货号
- **spuName** `string[]` — 填写spuName
- **supplyStatus** `integer` — 1-正常供货，3-停产
- **shelfStatus** `integer` — 1-已上架，2-已下架，3-待上架
- **sheinSaleByInventory** `integer` — 1-实际库存，2-虚拟库存

## 响应参数

- **code** `string` — 成功：0
- **msg** `string` — 成功：OK
- **info** `object`
  - **count** `integer` — 查询总数
  - **list** `object` — 备货建议列表
    - **id** `integer` — skc备货建议批次id
    - **imgPath** `string` — skc图片链接
    - **supplierCode** `string` — 供方货号
    - **skc** `string` — shein skc 编码
    - **spuName** `string` — shein spu 编码
    - **categoryName** `string` — 商品分类
    - **shelfDays** `integer` — 上架天数
    - **operateLabelList** `object[]` — 运营标签
      - **type** `string` — 类型
      - **name** `string` — 名称
      - **value** `integer` — 值
      - **note** `string` — 备注
      - **activityList** `object` — 活动
        - **name** `string` — 活动名称
        - **date** `string` — 活动日期
    - **rightsLabelList** `object[]` — 权益标签
      - **type** `string` — 类型
      - **name** `string` — 名称
      - **value** `integer` — 值
      - **note** `string` — 备注
      - **activityList** `object` — 活动
        - **name** `string` — 活动名称
        - **date** `string` — 活动日期
    - **goodsLabelList** `object[]` — 商品标签
      - **type** `string` — 类型
      - **name** `string` — 名称
      - **value** `integer` — 值
      - **note** `string` — 备注
    - **supplyStatus** `object` — 供应状态
      - **type** `string` — 类型
      - **name** `string` — 名称
      - **value** `integer` — 值
      - **note** `string` — 备注
    - **shelfStatus** `object` — 上架状态
      - **type** `string` — 类型
      - **name** `string` — 名称
      - **value** `integer` — 值
      - **note** `string` — 备注
    - **saleModel** `object` — shein销售模式
      - **type** `string` — 类型
      - **name** `string` — 名称
      - **value** `integer` — 值
      - **note** `string` — 备注
    - **qualityGrade** `object` — 质量标签
      - **type** `string` — 类型
      - **name** `string` — 名称
      - **value** `integer` — 值
      - **note** `string` — 备注
    - **goodsLevel** `object` — 商品层次
      - **type** `string` — 类型
      - **goodsLevelName** `string` — 名称
      - **goodsLevel** `integer` — 值
      - **note** `string` — 不知
    - **stockStandard** `object` — 备货标准
      - **type** `string` — 类型
      - **name** `string` — 名称
      - **value** `integer` — 值
      - **note** `string` — 备注
    - **skuList** `object[]` — sku备货建议信息
      - **id** `string` — sku备货建议批次id
      - **skuCode** `string` — shein sku 编码
      - **suffixZh** `string` — 属性集
      - **predictDaySales** `integer` — 预测日销
      - **orderCnt** `integer` — 购买单数
      - **totalSaleVolume** `integer` — 当天销量
      - **c7dSaleCnt** `integer` — 近7天销量
      - **c30dSaleCnt** `integer` — 近30天销量
      - **stayDeliver** `integer` — 待发货量
      - **stayShelf** `integer` — 待上架量
      - **transit** `integer` — 在途量
      - **stock** `integer` — 库存量
      - **transitSale** `integer` — 负卖
      - **preemptionNum** `integer` — 销售预占量
      - **stockSaleDays** `integer` — 库存可售天数
      - **saleDays** `integer` — 可售天数
      - **goodsDate** `integer` — 货期
      - **stockDays** `integer` — 备货天数
      - **jitGoodsTime** `string` — Jit货期
      - **jitStockUpDay** `string` — Jit备货天数
      - **adviceOrderCount** `integer` — 建议下单数
      - **orderCount** `integer` — 已下单数
      - **planUrgentCount** `integer` — 预计急采数
      - **currencySymbol** `string` — 货币代码
      - **autoOrderStatus** `integer` — 是否自动下单
      - **allotPassage** `integer` — 调拨转运在途
      - **mallSaleStatus** `integer` — 商城销售状态
      - **invoiceStatusName** `string` — 发票状态

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/openapi-business-backend/stock-goods-list' \
--header 'x-lt-signature: test0' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752154263008' \
--data-raw '{
 
 
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "count": 10,
    "list": [
      {
        "id": 3058691,
        "picUrl": "https://imgdeal-test01.shein.com/v4/j/pi/2025/04/20/06/17451210808e6a3b15608fa1192d57fcba7b3fdda6_square.jpg",
        "imgPath": "https://imgdeal-test01.shein.com/v4/j/pi/2025/04/20/06/17451210808e6a3b15608fa1192d57fcba7b3fdda6_square.jpg",
        "supplierCode": "111",
        "skc": "ss25042044640264012",
        "spu": "s250420446402",
        "spuName": "s250420446402",
        "categoryName": "女士短连衣裙",
        "shelfDays": 0,
        "operateLabelList": [],
        "rightsLabelList": [],
        "goodsLabelList": [],
        "supplyStatus": {
          "type": "success",
          "name": "正常供货",
          "value": null,
          "goodsLevelName": "正常供货",
          "goodsLevel": null,
          "note": null,
          "sortValue": null,
          "activityList": null,
          "exitPlatformActivity": false
        },
        "shelfStatus": {
          "type": "warning",
          "name": "待上架",
          "value": 0,
          "goodsLevelName": "待上架",
          "goodsLevel": 0,
          "note": null,
          "sortValue": null,
          "activityList": null,
          "exitPlatformActivity": false
        },
        "saleModel": {
          "type": "success",
          "name": "实际库存",
          "value": null,
          "goodsLevelName": "实际库存",
          "goodsLevel": null,
          "note": null,
          "sortValue": null,
          "activityList": null,
          "exitPlatformActivity": false
        },
        "qualityGrade": null,
        "goodsLevel": null,
        "stockStandard": null,
        "stockWarnStatus": null,
        "skuList": [
          {
            "id": 1515922,
            "skuCode": "I5cmbaujgtlf",
            "attr": "黄色-XXS",
            "suffixZh": "黄色-XXS",
            "predictDaySales": 0,
            "orderCnt": 0,
            "totalSaleVolume": 0,
            "c7dSaleCnt": 0,
            "c30dSaleCnt": 0,
            "stayDeliver": 0,
            "stayShelf": 0,
            "transit": 0,
            "stock": 0,
            "transitSale": 0,
            "preemptionNum": 0,
            "allotPassage": 0,
            "planUrgentCount": 0,
            "stockSaleDays": 0,
            "saleDays": 0,
            "goodsDate": 0,
            "stockDays": 0,
            "jitGoodsTime": null,
            "jitStockUpDay": null,
            "adviceOrderCount": null,
            "orderCount": 0,
            "autoOrderStatus": null,
            "price": "999.80",
            "currencySymbol": "USD",
            "mallSaleStatus": null,
            "invoiceStatusName": null
          },
          {
            "id": 1515921,
            "skuCode": "I5cmbaujha2n",
            "attr": "黄色-XS",
            "suffixZh": "黄色-XS",
            "predictDaySales": 0,
            "orderCnt": 0,
            "totalSaleVolume": 0,
            "c7dSaleCnt": 0,
            "c30dSaleCnt": 0,
            "stayDeliver": 0,
            "stayShelf": 0,
            "transit": 0,
            "stock": 0,
            "transitSale": 0,
            "preemptionNum": 0,
            "allotPassage": 0,
            "planUrgentCount": 0,
            "stockSaleDays": 0,
            "saleDays": 0,
            "goodsDate": 0,
            "stockDays": 0,
            "jitGoodsTime": null,
            "jitStockUpDay": null,
            "adviceOrderCount": null,
            "orderCount": 0,
            "autoOrderStatus": null,
            "price": "999.80",
            "currencySymbol": "USD",
            "mallSaleStatus": null,
            "invoiceStatusName": null
          },
          {
            "id": null,
            "skuCode": "合计",
            "attr": "合计",
            "suffixZh": "合计",
            "predictDaySales": 0,
            "orderCnt": null,
            "totalSaleVolume": 0,
            "c7dSaleCnt": 0,
            "c30dSaleCnt": 0,
            "stayDeliver": 0,
            "stayShelf": 0,
            "transit": 0,
            "stock": 0,
            "transitSale": 0,
            "preemptionNum": 0,
            "allotPassage": 0,
            "planUrgentCount": 0,
            "stockSaleDays": 0,
            "saleDays": 0,
            "goodsDate": null,
            "stockDays": null,
            "jitGoodsTime": null,
            "jitStockUpDay": null,
            "adviceOrderCount": null,
            "orderCount": 0,
            "autoOrderStatus": null,
            "price": "-",
            "currencySymbol": "USD",
            "mallSaleStatus": null,
            "invoiceStatusName": null
          }
        ]
      },
      {
        "id": 3058264,
        "picUrl": "https://imgdeal-test01.shein.com/v4/j/pi/2025/04/20/3b/1745121133b9b00faf092921ef37679a195d1e9eb8.jpg",
        "imgPath": "https://imgdeal-test01.shein.com/v4/j/pi/2025/04/20/3b/1745121133b9b00faf092921ef37679a195d1e9eb8.jpg",
        "supplierCode": "222",
        "skc": "ss25042054684812177",
        "spu": "s250420546848",
        "spuName": "s250420546848",
        "categoryName": "女士短连衣裙",
        "shelfDays": 0,
        "operateLabelList": [],
        "rightsLabelList": [],
        "goodsLabelList": [],
        "supplyStatus": {
          "type": "success",
          "name": "正常供货",
          "value": null,
          "goodsLevelName": "正常供货",
          "goodsLevel": null,
          "note": null,
          "sortValue": null,
          "activityList": null,
          "exitPlatformActivity": false
        },
        "shelfStatus": {
          "type": "warning",
          "name": "待上架",
          "value": 0,
          "goodsLevelName": "待上架",
          "goodsLevel": 0,
          "note": null,
          "sortValue": null,
          "activityList": null,
          "exitPlatformActivity": false
        },
        "saleModel": {
          "type": "success",
          "name": "实际库存",
          "value": null,
          "goodsLevelName": "实际库存",
          "goodsLevel": null,
          "note": null,
          "sortValue": null,
          "activityList": null,
          "exitPlatformActivity": false
        },
        "qualityGrade": null,
        "goodsLevel": null,
        "stockStandard": null,
        "stockWarnStatus": null,
        "skuList": [
          {
            "id": 1515919,
            "skuCode": "I7bd8r8hgfj8",
            "attr": "灰色-XXS",
            "suffixZh": "灰色-XXS",
            "predictDaySales": 0,
            "orderCnt": 0,
            "totalSaleVolume": 0,
            "c7dSaleCnt": 0,
            "c30dSaleCnt": 0,
            "stayDeliver": 0,
            "stayShelf": 0,
            "transit": 0,
            "stock": 0,
            "transitSale": 0,
            "preemptionNum": 0,
            "allotPassage": 0,
            "planUrgentCount": 0,
            "stockSaleDays": 0,
            "saleDays": 0,
            "goodsDate": 0,
            "stockDays": 0,
            "jitGoodsTime": null,
            "jitStockUpDay": null,
            "adviceOrderCount": null,
            "orderCount": 0,
            "autoOrderStatus": null,
            "price": "999.80",
            "currencySymbol": "USD",
            "mallSaleStatus": null,
            "invoiceStatusName": null
          },
          {
            "id": 1515920,
            "skuCode": "I7bd8r8hgys4",
            "attr": "灰色-XS",
            "suffixZh": "灰色-XS",
            "predictDaySales": 0,
            "orderCnt": 0,
            "totalSaleVolume": 0,
            "c7dSaleCnt": 0,
            "c30dSaleCnt": 0,
            "stayDeliver": 0,
            "stayShelf": 0,
            "transit": 0,
            "stock": 0,
            "transitSale": 0,
            "preemptionNum": 0,
            "allotPassage": 0,
            "planUrgentCount": 0,
            "stockSaleDays": 0,
            "saleDays": 0,
            "goodsDate": 0,
            "stockDays": 0,
            "jitGoodsTime": null,
            "jitStockUpDay": null,
            "adviceOrderCount": null,
            "orderCount": 0,
            "autoOrderStatus": null,
            "price": "999.80",
            "currencySymbol": "USD",
            "mallSaleStatus": null,
            "invoiceStatusName": null
          },
          {
            "id": null,
            "skuCode": "合计",
            "attr": "合计",
            "suffixZh": "合计",
            "predictDaySales": 0,
            "orderCnt": null,
            "totalSaleVolume": 0,
            "c7dSaleCnt": 0,
            "c30dSaleCnt": 0,
            "stayDeliver": 0,
            "stayShelf": 0,
            "transit": 0,
            "stock": 0,
            "transitSale": 0,
            "preemptionNum": 0,
            "allotPassage": 0,
            "planUrgentCount": 0,
            "stockSaleDays": 0,
            "saleDays": 0,
            "goodsDate": null,
            "stockDays": null,
            "jitGoodsTime": null,
            "jitStockUpDay": null,
            "adviceOrderCount": null,
            "orderCount": 0,
            "autoOrderStatus": null,
            "price": "-",
            "currencySymbol": "USD",
            "mallSaleStatus": null,
            "invoiceStatusName": null
          }
        ]
      }
    ],
    "message": null,
    "updateTime": null
  },
  "bbl": null,
  "traceId": "eb7393ff54fcfc40"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002062。