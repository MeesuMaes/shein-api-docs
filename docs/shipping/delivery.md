# 查询发货单列表

`GET /open-api/shipping/delivery`

**QPS**：100 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v17 ｜ **更新时间**：2026-09-24 14:26:06 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3002045](https://open.sheincorp.com/documents/apidoc/detail/3002045)

## 接口说明

查询发货单列表

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **count** `int64` — 总记录数
  - **list** `object[]` — 分页数组
    - **addTime** `datetime` — 发货时间，发货日期
    - **deliveryCode** `string` — 发货单号
    - **deliveryOrderDataList** `object[]`
      - **deliveryQuantity** `integer` — 尺码维度发货数量
      - **orderNo** `string` — 订单号
      - **skc** `string` **必填** — skc
      - **skuCode** `string` — sku编码-暂未使用
    - **deliveryType** `integer` — 发货方式的值
    - **deliveryTypeName** `string` — 发货方式名称
    - **shippingType** `string` — 发货类型：1大货发货 2复议发货 3增值发货
    - **shippingTypeName** `string` — 发货类型名称
    - **expressCode** `string` — 物流单号，SHEIN合作物流在有运单号的情况下会返回，货代方式大部分会返回，少数情况下货代公司没有返回运费单，车队发货目前没有运单号，自提自送和查货没有返回运单号
    - **expressCompanyName** `string` — 快递公司名称
    - **expressId** `string` — 快递公司
    - **logisticsLabelPrintFlag** `integer` — 是否需要打印物流商面单：1=支持（如INPOST），2=不支持（如普通快递）
    - **packageWeight** `double` — 包裹重量
    - **preReceiptTime** `datetime` — 预计到货时间
    - **receiptTime** `datetime` — 实际到货时间
    - **reserveParcelTime** `datetime` — 预约取件时间
    - **sendPackage** `integer` — 包裹总数
    - **supplierWarehouseId** `int64` — 仓库id
    - **supplierWarehouseName** `string` — 仓库名称
    - **takeParcelTime** `datetime` — 实际取件时间
    - **consolidationInfo** `object` — 集货物流信息
      - **address** `string` — 集货仓收货地址
      - **carrierName** `string` — 集货物流，承运方名称（物流公司名称）
      - **deliveryType** `integer` — 发货方式的值
      - **deliveryTypeName** `string` — 送货方式名称
      - **expressCode** `string` — 集货物流，运单号
      - **expressId** `string` — 集货物流，物流公司code
      - **person** `string` — 集货仓收货人
      - **phone** `string` — 集货仓联系电话
      - **reserveParcelTime** `datetime` — 集货物流，预约取件时间
      - **thirdPartyChannel** `int64` — 集货物流的渠道，如果有返回值的情况，表示SHEIN代下单的渠道。如果返回0，则表示商家自行下单
      - **thirdPartyChannelName** `integer` — 集货物流，渠道名
      - **thirdPartyOrderMethod** `integer` — 货代下单方式，1：SHEIN代下单，2：商家自行下单
      - **warehouseId** `int64` — 集货仓ID
      - **warehouseName** `string` — 集货仓名
- **msg** `string` — 错误描述,成功：OK；支持指定语种出参；
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi.sheincorp.cn/open-api/shipping/delivery?deliveryCode=20250430100099' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570681772' \
--data-raw ''
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "count": 296,
    "list": [
      {
        "deliveryCode": "20240124100007",
        "deliveryType": 1,
        "deliveryTypeName": "快递/物流送货",
        "expressId": "chemen",
        "expressCompanyName": "车门",
        "expressCode": "S0085029226880",
        "sendPackage": 10,
        "packageWeight": 0,
        "takeParcelTime": null,
        "reserveParcelTime": "2024-01-25 18:33",
        "addTime": "2024-01-24 13:50:38",
        "preReceiptTime": "1970-01-01 08:00:01",
        "receiptTime": "1970-01-01 08:00:01",
        "supplierWarehouseId": 78377,
        "supplierWarehouseName": "323432",
        "deliveryOrderDataList": [
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yilwrnq",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yilyuw3",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yim0j0g",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yim24bo",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yim4075",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yim5nov",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yim79g5",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yim8u9s",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yimaioa",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yimc0zi",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yimdlcs",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yimf5oe",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          },
          {
            "skc": "se2204266637766551",
            "skuCode": "I0103yimiv2c",
            "orderNo": "B231102500137-1",
            "deliveryQuantity": 710
          }
        ]
      },
      {
        "deliveryCode": "20240124100002",
        "deliveryType": 2,
        "deliveryTypeName": "送货上门",
        "expressId": "",
        "expressCompanyName": "",
        "expressCode": "",
        "sendPackage": 2,
        "packageWeight": 2,
        "takeParcelTime": null,
        "reserveParcelTime": null,
        "addTime": "2024-01-24 11:12:22",
        "preReceiptTime": "1970-01-01 08:00:01",
        "receiptTime": "1970-01-01 08:00:01",
        "supplierWarehouseId": 78377,
        "supplierWarehouseName": "323432",
        "deliveryOrderDataList": [
          {
            "skc": "ss23110643492437",
            "skuCode": "I3jrx7cgrjdu",
            "orderNo": "B240102500419",
            "deliveryQuantity": 5
          }
        ]
      }
    ]
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002045。