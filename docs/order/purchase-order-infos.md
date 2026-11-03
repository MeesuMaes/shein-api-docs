# 获取采购单信息

`GET /open-api/order/purchase-order-infos`

**QPS**：50 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v51 ｜ **更新时间**：2026-10-20 17:18:06 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3002068](https://open.sheincorp.com/documents/apidoc/detail/3002068)

## 接口说明

该接口适用于全托管、SHEIN自营以及POP三种店铺类型，可用来获取对应店铺的采购单列表，并进一步查询每个采购单的详细信息。通过该接口，可以查询到普通备货单和急采单两类采购单。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` **必填** — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` — 状态码
- **msg** `string` — 错误描述,成功：OK；支持指定语种出参；
- **info** `object` — 响应信息
  - **count** `double` — 总数
  - **pageNo** `double` — 页码
  - **pageSize** `double` — 页面数量
  - **list** `object[]` — 数据列表
    - **orderNo** `string` — 订单编号
    - **typeName** `string` — 订单类型，1：急采，2：备货
    - **type** `int64` — 备货单类型，1：急采，2：备货
    - **status** `integer` — 订单状态；1:待下单/ 2:已下单/ 3:发货中/ 4:已送货/ 5:已收货/ 6:已查验/ 7:已退货/ 8:已完成/ 9:无货下架/ 10:已作废/ 11:待审核/ 12:分单中/ 13:待退货 全托管（代运营）模式只有2、3、4、5、7、8、10状态；
    - **sceneType** `integer` — 生成场景，1:履约需求 2:拆分履约 3:补充入仓；sceneType=3的时候不需要发货，不需要创建发货单。jit母单场景该字段为null，仅全托管场景可用。
    - **orderExtends** `object[]` — 详情信息
      - **skc** `string` — SHEIN skc
      - **skuCode** `string` — SHEIN sku
      - **supplierCode** `string` — 商家货号（skc纬度）
      - **supplierSku** `string` — 商家sku
      - **price** `double` — 结算价格
      - **suffixZh** `string` — 属性集是属性值的拼接，如Blue-L，最多三个属性值拼接
      - **imgPath** `string` — SKC图片
      - **skuImg** `string` — sku图片；该字段仅全托管可用；
      - **needQuantity** `integer` — 需求数量
      - **orderQuantity** `integer` — 下单数量
      - **deliveryQuantity** `integer` — 送货数量
      - **receiptQuantity** `integer` — 收货数量
      - **storageQuantity** `integer` — 入仓数量
      - **defectiveQuantity** `integer` — 次品数量
      - **requestDeliveryQuantity** `string` — JIT母单中已下子备货单数量（适用Jit场景）；
      - **noRequestDeliveryQuantity** `string` — JIT母单中未下子备货单数量（适用Jit场景）；
      - **alreadyDeliveryQuantity** `string` — JIT母单中子备货单的总已发货单数量（适用Jit场景）；
      - **remark** `string` — 备注
    - **currencyName** `string` — 币种名称；全托管（代运营）模式支持指定语种出参；
    - **currency** `string` — 币种代码
    - **currencyId** `integer` — 币种Id
    - **isPriorProductionName** `string` — 是否优先生产（枚举值：是、否；适用Jit场景）；
    - **isJitMotherName** `string` — 是否JIT母单（枚举值：是、否） 场景示例：JIT母单是预下单，需要发货时，比如需要发货100，会产生一个JIT子单（即普通订单）数量100。
    - **supplierName** `string` — 商家名称
    - **orderSupervisor** `string` — 跟单员（适用Jit场景）；
    - **addUid** `string` — 添加人（适用Jit场景）；
    - **orderLabelInfo** `object[]` — 备货单标签信息（暂只支持全托管模式返回）
      - **orderLabel** `integer` — 备货单标签枚举值；
      - **orderLabelName** `string` — 备货单标签名称；如“安检”等信息；支持按指定语种出参；
    - **goodsLevel** `object[]` — 备货单商品层次信息（暂只支持全托管模式返回）
      - **goodsLevel** `integer` — 商品层次名称枚举值；
      - **goodsLevelName** `string` — 商品层次名称；如“备货款A”，“新款A”等信息；支持按指定语种出参；
    - **requestDeliveryTime** `datetime` — 要求发货时间（适用Jit场景）；
    - **requestReceiptTime** `datetime` **必填** — 要求收货时间，采购单下发后有值（备货&急采） 要求送至SHEIN仓的最晚时间
    - **requestTakeParcelTime** `string` — 要求取件时间，急采单下发后有值，备货单可能返回为空；送货方式选择“SHEIN合作物流”，商家超过该时效会交货给到物流，将会面临罚款
    - **addTime** `string` — 备货单的创建时间
    - **allocateTime** `string` — 备货单的下发时间
    - **updateTime** `datetime` — 更新时间；状态发生变更的采购单的时间
    - **reserveTime** `string` — 预约送货时间；全托管（代运营）模式无需关注
    - **receiptTime** `string` — SHEIN仓库收货时间
    - **checkTime** `string` — 质检完成时间
    - **storageTime** `string` — 仓库确认入库的时间
    - **returnTime** `string` — 退货时间；质检失败，订单状态变为「已退货」，代表SHEIN确认要进行退货
    - **requestCompleteTime** `string` — 要求完工时间（适用Jit场景）；
    - **deliveryTime** `datetime` — 发货时间
    - **firstMarkName** `string` — 首单标识；首单要求发货80%以上，自主上新的订单首单要求订单所有尺码的送货数量>=1
    - **firstMark** `boolean` — 首单标识
    - **prepareTypeName** `string` — 备货类型名称 ，当采购单类型是备货时有值；备货类型一致才可以合单发货；当值=[JIT备货]时，代表该采购单为Jit采购单；
    - **prepareTypeId** `integer` — 备货类型值 ，当采购单类型是备货时有值；备货类型一致才可以合单发货；当值=[9]时代表该备货单为Jit子单；
    - **categoryName** `string` — 订单类型名称 (ODM单 线上单 线下单)；全托管（代运营）模式无需关注
    - **orderMarkName** `string` — 订单标识名称 (正常备货 样衣订单 退货再入仓)；全托管（代运营）模式无需关注
    - **urgentTypeName** `string` — 紧急类型 (普通 紧急 特急)；表示订单的紧急程度
    - **urgentType** `integer` — 紧急标识；仅全托管（代运营）模式返回；
    - **storageId** `string` — SHEIN收货仓库id
    - **recommendedSubWarehouseId** `string` — 预估收货仓id；只有一个枚举ID=1347（华东质检仓）或者0（华东转运仓）或者空，预估收货仓ID一致时才能合单发货；
    - **warehouseName** `string` — 收货仓库id对应的仓库名称
    - **countryMarket** `int64` — 预销国家市场；0：默认/ 1：南大区/ 2：北大区；当备货单类型type=2时才会返回，1和2的备货单不能合单发货，0可以和1或2合单发货；如果countryMarket返回null则表示没有指定的大区。
    - **isProductionCompletionName** `string` — 是否生产完成（适用Jit场景）；
    - **isAllDeliveryName** `string` — 是否完全要求发货（适用Jit场景）；
    - **isDeliveryName** `string` — 是否送货（适用Jit场景）；
    - **statusName** `string` — 状态名称；全托管（代运营）模式支持指定语种出参；
    - **customInfoId** `string` — 仅限订单为C端定制有数据，客单定制信息id
    - **customInfo** `json` — 仅限订单为C端定制有数据，客单定制信息
    - **attributeVersion** `integer` — 成份版本号；（当前仅OEM，ODM商家有返回值）
    - **isIncrementOnWay** `integer` — 是否增值中；1:是/ 2:否；（当前仅OEM，ODM商家有返回值）
    - **taxRefundType** `integer` — 仅全托管订单可用，退税类型：1-0110自行退税，0-无退税。jit订单返回为空。
    - **deliveryCheckRuleFields** `object` — 全托管发货规则字段集，枚举值可参考：备货履约解决方案 ，“5.4、创建发货单”的说明
      - **ruleName** `string` — 发货规则名称，如“订单大仓”、“订单类型”
      - **fieldValue** `object` — 发货规则对应的字段值，针对不同的发货规则名称，返回的规则枚举值不同
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi.sheincorp.cn/open-api/order/purchase-order-infos?orderNos=PB2505200000635' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570729613' \
--header 'language: EN' \
--data-raw ''
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "count": 1,
    "pageNo": 1,
    "pageSize": 20,
    "list": [
      {
        "orderNo": "PB2505200000635",
        "typeName": "急采",
        "currencyName": "人民币元",
        "currency": null,
        "supplierName": "H12",
        "orderSupervisor": "练红秀",
        "addUid": "dms-root",
        "requestDeliveryTime": "2025-04-23 23:59:59",
        "orderLabelInfo": [
          {
            "orderLabel": 163,
            "orderLabelName": ""
          },
          {
            "orderLabel": 13,
            "orderLabelName": "安检"
          },
          {
            "orderLabel": 193,
            "orderLabelName": "履约评估考核订单"
          }
        ],
        "goodsLevel": [
          {
            "goodsLevel": 228,
            "goodsLevelName": "退供款"
          }
        ],
        "addTime": "2025-04-23 06:17:38",
        "allocateTime": "2025-04-23 06:21:05",
        "reserveTime": "1970-01-01 08:00:01",
        "receiptTime": "1970-01-01 08:00:01",
        "checkTime": "1970-01-01 08:00:01",
        "storageTime": "2025-04-24 21:44:48",
        "returnTime": "1970-01-01 08:00:01",
        "requestTakeParcelTime": "2025-04-23 23:59:59",
        "requestReceiptTime": null,
        "firstMarkName": "否",
        "prepareTypeName": "备货单",
        "categoryName": "1急采",
        "orderMarkName": "正常备货",
        "warehouseName": "佛山仓",
        "urgentTypeName": "",
        "urgentType": null,
        "storageId": 1,
        "recommendedSubWarehouseId": 0,
        "requestCompleteTime": null,
        "isProductionCompletionName": null,
        "isAllDeliveryName": null,
        "isDeliveryName": null,
        "currencyId": 156,
        "firstMark": 2,
        "orderMarkId": 733,
        "prepareTypeId": 17,
        "category": 0,
        "type": 1,
        "status": 8,
        "statusName": "已完成",
        "updateTime": "2025-04-25 01:21:59",
        "isJitMotherName": "否",
        "isPriorProductionName": null,
        "orderExtends": [
          {
            "skc": "s255904",
            "price": 73,
            "needQuantity": null,
            "orderQuantity": 1,
            "deliveryQuantity": 1,
            "receiptQuantity": 0,
            "storageQuantity": 1,
            "defectiveQuantity": 0,
            "supplierCode": "SWLC1265-5BR28",
            "remark": "",
            "imgPath": "https://img.ltwebstatic.com/images3_spmp/2025/03/14/e2/1741946708842dfe053372c941778f161b55e09e60.jpg",
            "skuImg": "",
            "requestDeliveryQuantity": null,
            "noRequestDeliveryQuantity": null,
            "alreadyDeliveryQuantity": null,
            "supplierSku": "SBR28",
            "skuCode": "I2840edmz",
            "suffixZh": "棕色-28 inch"
          }
        ],
        "deliveryTime": "2025-04-23 17:13:16",
        "customInfoId": "",
        "customInfo": null
      }
    ]
  },
  "bbl": {},
  "traceId": "b30354e8da18ea2e"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002068。