# 创建发货单

`POST /open-api/shipping/orderToShipping`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v35 ｜ **更新时间**：2026-08-28 18:02:11 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3002010](https://open.sheincorp.com/documents/apidoc/detail/3002010)

## 接口说明

使用该接口创建发货单，进行订单发货。全托管订单发货方式请查看备货单履约管理文档。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **adminName** `string` **必填** — 用户名称（ERP系统可自行定义，用于系统记录此次发货的操作人，页面不展示）
- **agedProductCode** `string` — 物流时效产品编码，从查询SHEIN合作物流产品接口获取
- **list** `object[]`
  - **skuCode** `string` **必填** — sku编码，需要入参采购单中所有的SKU
  - **orderNo** `string` **必填** — 订单编号
  - **orderQuantity** `integer` — 下单数量
  - **packageNum** `integer` — 包裹数（箱唛发货时必填，同一订单传相同包裹数）
  - **tempDeliveryQuantity** `integer` **必填** — 实际发货数量：如果待发货数量大于500，单次发货需要大于150
  - **packingInfoList** `object` — 装箱明细，当发货基本信息查询接口的shippingRoute为1或者2时需要传入装箱明细，shippingRoute=0时不需要填写装箱明细
    - **packQuantity** `integer` **必填** — 装箱数量
    - **skuCode** `string` **必填** — 装箱的sku编码
- **orderType** `integer` **必填** — 订单类型，1：急采，2：备货
- **deliveryType** `integer` **必填** — 发货方式，商家可用的发货方式枚举值请从发货基本信息查询获取；全托管发货方式枚举值可以查看备货单履约管理
- **arrivalTime** `datetime` — 预约SHEIN到仓时间（yyyy-MM-dd HH:mm:ss），当deliveryType=4或21时必填
- **shippingRoute** `integer` — 发货路径，0：直送路径，无需装箱明细。1：直送路径，需要装箱明细。2：集货路径
- **expressId** `string` — 快递编码，当deliveryType=1时必填，SHEIN集成物流场景从 查询SHEIN合作物流产品接口的companyCode字段获取
- **coding** `string` — 车队编码，当deliveryType=2且使用车队发货的场景必填，从发货基本信息查询接口的motorcadeId查询
- **expressInfo** `object[]` **必填** — 运单包裹信息
  - **addrId** `int64` **必填** — 发货地址id，从发货基本信息查询接口中获取
  - **expressCode** `string` — 快递单号，适用非SHEIN集成物流场景
  - **packageNumber** `integer` **必填** — 总包裹数量（箱唛类型时=所有订单包裹的总计）
  - **packageWeight** `double` — 包裹重量（单位:kg）
  - **reserveParcelTime** `datetime` — 预约取件时间（yyyy-MM-dd HH:mm:ss），当deliveryType=1和2时必填
- **deliveryPackages** `object[]` — 包裹信息列表，包裹列表的长度必须与包裹数量相同，只在欧洲地区使用INPOST物流商发货时需要传入，其它的场景不需要传入包裹信息。
  - **index** `integer` **必填** — 包裹序号，从0开始
  - **packageHeight** `double` — 包裹高(cm)
  - **packageLength** `double` — 包裹长(cm)
  - **packageWeight** `double` — 包裹重量(kg)
  - **packageWidth** `double` — 包裹宽(cm)
- **supplierWarehouseId** `int64` **必填** — 商家仓库id
- **subWarehouseId** `integer` — 供应商子仓ID
- **thirdPartyChannel** `int64` — 货代渠道，当deliveryType = 2时，且需要使用货代发货的场景下必填，从查询货代信息查询
- **thirdPartyChannelName** `string` — 货代渠道名称，当deliveryType = 2时，且需要使用货代发货的场景下必填，从查询货代信息查询
- **thirdPartyOrderMethod** `integer` — 货代下单方式，1：SHEIN代下单，2：商家自行下单。当deliveryType = 2时，且需要使用货代发货的场景下必填

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **deliveryCode** `string` **必填** — 发货单号
  - **expressCode** `string` — 运单号（系统自动产生运单时，返回运单号）
  - **reserveParcelTime** `datetime` — 预约取件开始时间
  - **reserveParcelTimeEnd** `datetime` — 预约取件结束时间
- **msg** `string` — 错误描述，成功：OK；支持指定语种出参；
- **traceId** `string` — 请求的唯一标识，用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/shipping/orderToShipping' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570849017' \
--data-raw '{
  "agedProductCode": "abc",
  "adminName": "root test",
  "coding": "",
  "deliveryType": 1,
  "expressId": "kuayue",
  "expressInfo": [
    {
      "addrId": 688495,
      "expressCode": "",
      "packageNumber": 3,
      "reserveParcelTime": "2025-12-27 23:20:00"
    }
  ],
  "list": [
    {
      "orderNo": "PB2505220000462",
      "orderQuantity": "1",
      "packageNum": 1,
      "skuCode": "I24lsfii3qse",
      "tempDeliveryQuantity": 1,
      "type": 0
    },
    {
      "orderNo": "PB2505220000433",
      "orderQuantity": "1",
      "packageNum": 1,
      "skuCode": "I24lsfii3qse",
      "tempDeliveryQuantity": 1,
      "type": 0
    }
  ],
  "orderType": 2,
  "subWarehouseId": 27,
  "supplierWarehouseId": 89755
}'
```

### 响应示例

```json
{
  "code": "0032001",
  "msg": "B231107500397订单状态不能发货",
  "info": null,
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002010。