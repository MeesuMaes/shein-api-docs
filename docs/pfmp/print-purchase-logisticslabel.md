# 打印物流面单

`POST /open-api/pfmp/print-purchase-logisticsLabel`

**QPS**：50 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v4 ｜ **更新时间**：2026-08-05 15:21:25 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3001943](https://open.sheincorp.com/documents/apidoc/detail/3001943)

## 接口说明

用于下载物流商面单PDF。在创建发货单之后，如果查询发货单接口（/open-api/shipping/delivery）logisticsLabelPrintFlag参数为1，则需要打印物流商面单。
创建发货单之后，可以接收采购单合作物流通知（logistics_forecast_result_notice），当预报物流结果（reportResult）为1时，则预报成功，可以打印物流面单。
支持打印inpost物流商的面单。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种包括，英语：US，法语：FR，西班牙语：ES，德语：DE，中文简体：CN，泰语：TH，巴西葡语：PT，土耳其语：TR

## 请求参数

- **deliveryNo** `string` **必填** — 发货单号

## 响应参数

- **code** `string` **必填** — 响应编码成功：0
- **info** `object`
  - **url** `string` — 物流商面单PDF下载链接
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```json
{
  "deliveryNo": "SD2024060300123456"
}
```

### 响应示例

```json
{
  "code": "0",
  "info": {
    "url": "https://cdn.sheincorp.com/label/print/SD2024060300123456.pdf"
  },
  "msg": "OK"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001943。