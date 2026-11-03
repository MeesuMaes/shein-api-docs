# 查询商品删除审核记录

`POST /open-api/goods-delete-logs/search`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v1 ｜ **更新时间**：2026-07-03 13:41:30 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001906](https://open.sheincorp.com/documents/apidoc/detail/3001906)

## 接口说明

可查询近一年内，商家发起的商品删除的申请审核记录（平台发起的删除不在此范围内，平台会定期对长期无动销的商品进行删除）
入参查询status_list=2（审核成功）的话，可获取到已删除的SKC列表。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `int64` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `integer` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` — 接口签名
- **language** `string` — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **apply_no_list** `string[]` — 申请单号列表，单次最多10个。
- **skc_name_list** `string[]` — SKC平台编码列表，单次最多10个。
- **skc_supplier_code_list** `string[]` — SKC商家货号列表，单次最多10个。
- **status_list** `integer[]` — 删除申请的审核状态列表：0-待审核 1-审核中 2-成功 3-失败
- **submit_time_end** `datetime` — 申请提交时间段，结束时间（东八区），格式：yyyy-MM-dd HH:mm:ss。 最多可查询近一年的审核记录
- **submit_time_start** `datetime` — 申请提交时间段，开始时间（东八区），格式：yyyy-MM-dd HH:mm:ss。 最多可查询近一年的审核记录

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 响应结果
  - **data** `object[]` — 列表数据
    - **apply_no** `string` — 申请单号
    - **audit_complete_time** `datetime` — 审核完成时间。仅status=2（成功）时有值。
    - **fail_reason** `string` — 失败原因。支持多语言。
    - **skc_name** `string` — SKC平台编码。
    - **skc_supplier_code** `string` — SKC商家货号。
    - **status** `integer` — 审核状态：0-待审核 1-审核中 2-成功 3-失败
    - **submit_time** `datetime` — 申请提交时间
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods-delete-logs/search?page_num=1&page_size=10' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1782801946482' \
--header 'language: en' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "status_list":[0,1,2,3]
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
        "skc_name": "sd260625185879185501303",
        "skc_supplier_code": "S7987333",
        "apply_no": "PD202606301436510001",
        "status": 3,
        "submit_time": "2026-06-30 14:36:51",
        "audit_complete_time": null,
        "fail_reason": "Please delist the product first"
      },
      {
        "skc_name": "sd260625185879185501303",
        "skc_supplier_code": "S7987333",
        "apply_no": "PD202606301420500001",
        "status": 3,
        "submit_time": "2026-06-30 14:20:50",
        "audit_complete_time": null,
        "fail_reason": "Please delist the product first"
      },
      {
        "skc_name": "sa25070805055561895",
        "skc_supplier_code": "9813425",
        "apply_no": "PD202606301018360001",
        "status": 3,
        "submit_time": "2026-06-30 10:18:37",
        "audit_complete_time": null,
        "fail_reason": "SKC has orders that \"completed less than 1 year ago\" and cannot be deleted.;SKC has \"In-Transit Inventory\" or \"Physical Inventory\" that cannot be deleted."
      },
      {
        "skc_name": "sc25082277519232495",
        "skc_supplier_code": "sc20241119002s2412100969123",
        "apply_no": "PD202604290951080001",
        "status": 2,
        "submit_time": "2026-04-29 09:51:08",
        "audit_complete_time": "2026-04-29 09:51:11",
        "fail_reason": null
      },
      {
        "skc_name": "sa260312205878350217203",
        "skc_supplier_code": "123456",
        "apply_no": "PD202604290949590001",
        "status": 3,
        "submit_time": "2026-04-29 09:49:59",
        "audit_complete_time": null,
        "fail_reason": "SKC has orders that \"completed less than 1 year ago\" and cannot be deleted.;Please delist the product first"
      },
      {
        "skc_name": "sa260312205878350266072",
        "skc_supplier_code": "123456",
        "apply_no": "PD202604161113480001",
        "status": 3,
        "submit_time": "2026-04-16 11:13:48",
        "audit_complete_time": null,
        "fail_reason": "System error, please try again later."
      },
      {
        "skc_name": "sa260312205878350266072",
        "skc_supplier_code": "123456",
        "apply_no": "PD202604161112230001",
        "status": 3,
        "submit_time": "2026-04-16 11:12:23",
        "audit_complete_time": null,
        "fail_reason": "Please delist the product first"
      },
      {
        "skc_name": "ss24120485063300",
        "skc_supplier_code": "251ecebf2d8c43db8fecd75b92ea3e75",
        "apply_no": "PD202602091126460001",
        "status": 2,
        "submit_time": "2026-02-09 11:26:46",
        "audit_complete_time": "2026-02-09 11:26:48",
        "fail_reason": null
      },
      {
        "skc_name": "sa260122170130994088804",
        "skc_supplier_code": "JN_827176691272",
        "apply_no": "PD202602091124340001",
        "status": 2,
        "submit_time": "2026-02-09 11:24:35",
        "audit_complete_time": "2026-02-09 11:24:38",
        "fail_reason": null
      },
      {
        "skc_name": "sa25080598600641821",
        "skc_supplier_code": "iqeL204054kYm",
        "apply_no": "PD202602041023460001",
        "status": 2,
        "submit_time": "2026-02-04 10:23:46",
        "audit_complete_time": "2026-02-04 10:23:51",
        "fail_reason": null
      }
    ],
    "meta": {
      "count": 10,
      "customObj": {
        "scroll_id": null
      }
    }
  },
  "bbl": null,
  "traceId": "ca85f7f57151f457"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001906。