# 查询退货申请单列表

`POST /open-api/purchase/return-application-list`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v5 ｜ **更新时间**：2026-07-03 15:36:57 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001910](https://open.sheincorp.com/documents/apidoc/detail/3001910)

## 接口说明

分页查询退货申请单列表数据；如何对接请查看采购单退货解决方案

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **startTime** `string` — 开始时间（returnPlanNoList为空时必填），开始时间、结束时间跨度不要超过60天 例: `2026-05-27T12:09:52.245Z`
- **endTime** `string` — 结束时间（returnPlanNoList为空时必填），开始时间、结束时间跨度不要超过60天 例: `2026-05-27T12:09:52.245Z`
- **page** `integer` — 页码，不传默认1 例: `84`
- **pageSize** `integer` — 分页大小，1-100，不传默认100 例: `67`
- **queryType** `integer` — 查询类型：1-发起时间(returnTime)；2-更新时间(updateTime)；当returnPlanNoList为空时必填 例: `63`
- **returnPlanNoList** `string[]` — 退货申请单号列表（最多100个），有值时，returnTimeStart/returnTimeEnd/queryType可不传 例: `random_returnPlanNoList`
- **returnReasonTypes** `integer[]` — 发起原因：1滞销退、2关店退、3D2商品退、4商品稽查退、5面料&材质稽查退、6出库质检退、7入库问题退、8商家主动退、9CNPJ税务变更退、10运营发起退、11集货中转退；支持批量 例: `11`
- **status** `integer[]` — 退货申请单状态；1:待商家确认，2:商家申诉中，3:平台确认中，4:已取消，5:已确认，6:运营审批中 例: `84`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **data** `object[]`
    - **initiator** `integer` — 发起方1:SHEIN，2:商家 例: `6`
    - **processing** `object` — 处理
      - **planReturnAddress** `object` — 当申请退货时，给出退货地址信息
        - **address** `string` — 退货地址 例: `random_address`
        - **contact** `string` — 收件人 例: `random_contact`
        - **phone** `string` — 联系电话 例: `random_phone`
      - **returnGenerateQuantity** `integer` — 实际退货数量 例: `0`
      - **returnQuantity** `integer` — 发起数量 例: `78`
      - **returnScrappedQuantity** `integer` — 实际报废数量 例: `76`
    - **relateOrders** `object` — 关联的采购单信息
      - **deliveryCodes** `string[]` — 发货单号 例: `random_deliveryCodes`
      - **orders** `string[]` — 采购单号 例: `random_orders`
      - **returnOrders** `string[]` — 退货单号；报废单号 例: `random_returnOrders`
    - **returnDealType** `integer` — 处理方式；1:退货，2:报废 例: `27`
    - **returnPlanNo** `string` — 退货申请单号 例: `random_returnPlanNo`
    - **returnReasonType** `integer` — 发起原因：1滞销退、2关店退、3D2商品退、4商品稽查退、5面料&材质稽查退、6出库质检退、7入库问题退、8商家主动退、9CNPJ税务变更退、10运营发起退、11集货中转退 例: `58`
    - **returnTime** `string` — 发起时间 例: `2026-05-27T12:11:47.105Z`
    - **status** `integer` — 退货申请单状态；1:待商家确认，2:商家申诉中，3:平台确认中，4:已取消，5:已确认，6:运营审批中 例: `84`
    - **updateTime** `string` — 更新时间 例: `2026-05-27T12:11:47.105Z`
  - **meta** `object`
    - **count** `integer` 例: `56`
    - **customObj** `object`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/purchase/return-application-list' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570849017' \
--data-raw '{
    "startTime": "2026-03-15 00:00:00",
    "endTime": "2026-05-14 15:05:04",
    "page": 1,
    "returnPlanNoList": ["JH26051300000014"],
    "pageSize": 100,
    "queryType": 2
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
        "returnDealType": 1,
        "returnPlanNo": "JH26051300000014",
        "status": 6,
        "returnTime": "2026-05-13 16:10:12",
        "updateTime": "2026-05-13 16:10:15",
        "initiator": 2,
        "returnReasonType": 8,
        "relateOrders": {
          "orders": [],
          "deliveryCodes": [],
          "returnOrders": []
        },
        "processing": {
          "returnQuantity": 2,
          "returnGenerateQuantity": 0,
          "returnScrappedQuantity": 0,
          "planReturnAddress": {
            "contact": "shixin测试",
            "phone": "12345678900",
            "address": "广东省 广州市 番禺区 四海城"
          }
        }
      }
    ],
    "meta": {
      "count": 1,
      "customObj": {}
    }
  },
  "bbl": {},
  "traceId": "bc5a75ccc724fdee"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001910。