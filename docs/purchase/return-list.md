# 查询退货与报废单列表

`POST /open-api/purchase/return-list`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v6 ｜ **更新时间**：2026-07-03 15:35:30 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001909](https://open.sheincorp.com/documents/apidoc/detail/3001909)

## 接口说明

分页查询退货单、报废单列表数据；如何对接请查看采购单退货解决方案

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **startTime** `string` — 开始时间（returnOrderNoList为空时必填），开始时间、结束时间跨度不要超过60天 例: `2026-05-28T09:20:23.749Z`
- **endTime** `string` — 结束时间（returnOrderNoList为空时必填），开始时间、结束时间跨度不要超过60天 例: `2026-05-28T09:20:23.749Z`
- **page** `integer` — 页码，不传默认1 例: `16`
- **pageSize** `integer` — 分页大小，1-100，不传默认100 例: `72`
- **queryType** `integer` — 查询类型：1-根据退货单的发起时间查询，2-根据退货单的更新时间查询；当returnOrderNoList为空时必填 例: `86`
- **returnOrderNoList** `string[]` — 退货单号列表（最多200个），有值时，startTime/endTime/queryType可不传 例: `random_returnOrderNoList`
- **returnReasonTypes** `integer[]` — 发起原因列表：1滞销退、2关店退、3D2商品退、4商品稽查退、5面料&材质稽查退、6出库质检退、7入库问题退、8商家主动退、9CNPJ税务变更退、10运营发起退、11集货中转退 例: `64`
- **status** `integer[]` — 退货状态列表；1:平台确认中，2：待退货，3:部分出库，4:全部出库，5:已取消，6:已报废，7:待报废，8:退货中 例: `58`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **data** `object[]`
    - **addTime** `string` — 发起时间 例: `2026-05-28T09:22:42.613Z`
    - **initiator** `integer` — 发起方：1:SHEIN，2:商家 例: `57`
    - **processing** `object` — 处理
      - **actualQuantityProcessed** `integer` — 实际处理数量 例: `73`
      - **distributionType** `integer` — 退货方式；1:SHEIN合作物流，4:自提 例: `93`
      - **planReturnAddress** `object` **必填** — 退货地址信息
        - **address** `string` — 退货地址 例: `random_address`
        - **contact** `string` — 收件人 例: `random_contact`
        - **phone** `string` — 联系电话 例: `random_phone`
      - **planReturnQuantity** `integer` — 预计退货或报废数量 例: `76`
      - **returnDealType** `integer` — 处理方式；1:退货，2:报废 例: `6`
      - **returnExpressCompanyCode** `string` — 退货物流公司code 例: `random_returnExpressCompanyCode`
      - **returnExpressCompanyName** `string` — 退货物流公司名称 例: `random_returnExpressCompanyName`
      - **warehouse** `string` — SHEIN仓库名称 例: `random_warehouse`
      - **warehouseId** `integer` — SHEIN仓库id 例: `56`
      - **subWarehouseId** `string` — 子仓仓库id
      - **subWarehouseName** `string` — 子仓仓库名称
    - **relateOrders** `object` — 关联的采购单信息
      - **deliveryCodes** `string[]` — 发货单号 例: `random_deliveryCodes`
      - **orders** `string[]` — 采购单号 例: `random_orders`
      - **returnPlanNos** `string[]` — 退货申请单号 例: `random_returnPlanNos`
    - **returnInstructions** `string` — 退货说明 例: `random_returnInstructions`
    - **returnNo** `string` — 退货与报废单号 例: `random_returnNo`
    - **returnReasonType** `integer` — 发起原因列表：1滞销退、2关店退、3D2商品退、4商品稽查退、5面料&材质稽查退、6出库质检退、7入库问题退、8商家主动退、9CNPJ税务变更退、10运营发起退、11集货中转退 例: `19`
    - **returnStatus** `integer` — 退货状态；1:平台确认中，2：待退货，3:部分出库，4:全部出库，5:已取消，6:已报废，7:待报废，8:退货中 例: `80`
    - **signStatus** `integer` — 签收状态；1已签收，2未签收，0无需签收 例: `96`
    - **updateTime** `string` — 更新时间 例: `2026-05-28T09:22:42.613Z`
  - **meta** `object` **必填**
    - **count** `integer` 例: `58`
    - **customObj** `object` **必填**

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/open-api/purchase/return-list' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
    "queryType": 1,
    "page": 1,
    "returnOrderNoList": [
    "TG26050700010"
  ],
    "pageSize": 50
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "data": [
      {
        "returnNo": "TG26050700010",
        "returnStatus": 4,
        "addTime": "2026-05-09 14:18:24",
        "updateTime": "2026-05-09 14:18:23",
        "initiator": 2,
        "returnReasonType": 1,
        "returnInstructions": "发起退货说明测试",
        "signStatus": 2,
        "relateOrders": {
          "orders": [],
          "deliveryCodes": [],
          "returnPlanNos": [
            "JH26050700000082"
          ]
        },
        "processing": {
          "returnDealType": 1,
          "planReturnQuantity": 1,
          "actualQuantityProcessed": 0,
          "distributionType": 1,
          "warehouseId": 1,
          "warehouse": "佛山仓",
          "subWarehouseId": 59,
          "subWarehouseName": "宏盛2号仓",
          "planReturnAddress": {
            "contact": "123",
            "phone": "34231312123",
            "address": "天津市   tianjing123"
          },
          "returnExpressCompanyCode": "shunfeng",
          "returnExpressCompanyName": "顺丰"
        }
      }
    ],
    "meta": {
      "count": 1,
      "customObj": {}
    }
  },
  "bbl": {},
  "traceId": "36378874c25f8c10"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001909。