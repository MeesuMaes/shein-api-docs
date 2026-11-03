# ​查询货代信息

`POST /open-api/pfmp/shipping/thirdPartyAndChannelList`

**QPS**：50 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v7 ｜ **更新时间**：2026-10-23 18:28:10 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3002075](https://open.sheincorp.com/documents/apidoc/detail/3002075)

## 接口说明

用于查询货代信息，供商家选择使用货代服务。直送场景，当发货方式：deliveryType = 2时，支持使用货代方式发货。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **orderNoList** `string[]` — 订单号list
- **sellerAddressId** `int64` **必填** — 商家寄件地址id
- **shippingRoute** `integer` — 发货路径，1：直送，2：集货

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0
- **info** `object` — 结果
  - **data** `object[]` — 结果
    - **forwarderAccountId** `string` — 货代账号ID，若不存在账号ID，则返回null
    - **forwarderAccountName** `string` — 货代账号名称，若不存在，则返回空字符串
    - **isClmsOrder** `boolean` — 是否是CLMS订单 例: `false`
    - **orderConditionList** `integer[]` — 下单条件，1：运单号，2：预约取件时间，3：无，4：第三方货代渠道
    - **productChannelList** `object[]` — 第三方货代渠道列表
      - **productChannelId** `string` — 第三方货代产品渠道id
      - **productChannelName** `string` — 第三方货代产品渠道名称
    - **sceneConditionList** `object[]` — 不同场景（下单方式）的下单条件
      - **orderConditionList** `integer[]` — 下单条件，1：运单号，2：预约取件时间，3：无，4：产品渠道
      - **scene** `integer` — 下单条件场景，1-SHEIN代下单（线上下单） 2-自行下单（线下下单）
    - **thirdPartyCode** `string` — 第三方编码
    - **thirdPartyName** `string` — 第三方名称
    - **thirdPartyType** `integer` — 第三方类型，1-商家车队 2-第三方货代
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/pfmp/shipping/thirdPartyAndChannelList' \
--header 'Content-Type: application/json' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "sellerOrderNos": ["PO2026092300001", "PO2026092300002", "PO2026092300003"]
}'
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002075。