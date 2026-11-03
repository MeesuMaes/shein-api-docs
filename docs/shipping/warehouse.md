# 收货仓信息查询

`GET /open-api/shipping/warehouse`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v18 ｜ **更新时间**：2026-08-21 20:02:11 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3001982](https://open.sheincorp.com/documents/apidoc/detail/3001982)

## 接口说明

通过该接口获取备货单的平台收货仓地址信息（适用全托管、SHEIN自营模式）；

## 请求头

- **Content-Type** `string` **必填** — application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **subWareHouseId** `integer` — 子仓id
  - **subWarehouseName** `string` — 子仓名称
  - **warehouseAddress** `string` — 收货仓详细地址
  - **warehouseContact** `string` — 仓联系人
  - **warehousePhone** `string` — 样衣仓联系电话
  - **consolidationSubWareHouseId** `integer` — 集货仓子仓id，仅发货路径为集货时有值
  - **consolidationSubWarehouseName** `string` — 集货仓子仓名称，仅发货路径为集货时有值
  - **consolidationWarehouseAddress** `string` — 集货仓收件详细地址，仅发货路径为集货时有值
  - **consolidationWarehouseCityArea** `string` — 集货仓收件区，仅发货路径为集货时有值
  - **consolidationWarehouseCityName** `string` — 集货仓收件城市，仅发货路径为集货时有值
  - **consolidationWarehouseContact** `string` — 集货仓仓联系人，仅发货路径为集货时有值
  - **consolidationWarehousePhone** `string` — 集货仓仓联系方式，仅发货路径为集货时有值
  - **consolidationWarehouseProvinceName** `string` — 集货仓收件省（直辖市），仅发货路径为集货时有值
- **msg** `string` — 错误描述,成功：OK；（全托管模式支持指定语种出参）；
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi.sheincorp.cn/open-api/shipping/warehouse?addressId=4721&expressMode=shunfeng&orderType=1&sendType=1&orderNoList=1234566,234566,2345667' \
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
    "subWareHouseId": 4,
    "subWarehouseName": "佛山佳明仓",
    "warehouseAddress": "广东 深圳市 大鹏 12345",
    "warehouseContact": "佳明仓",
    "warehousePhone": "15222222222"
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001982。