# 发货单维度打印面单

`POST /open-api/shipping/delivery/print-package`

**QPS**：100 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v9 ｜ **更新时间**：2025-07-21 11:31:41 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3001293](https://open.sheincorp.com/documents/apidoc/detail/3001293)

## 接口说明

通过该接口获取发货单的物流面单信息；

## 请求头

- **Content-Type** `string`
- **x-lt-openKeyId** `string` — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **deliveryNo** `string` **必填** — 发货单号

## 响应参数

- **code** `string` **必填**
- **msg** `string` **必填** — 错误描述,成功：OK；支持指定语种出参；
- **info** `object` **必填**
  - **url** `string` **必填** — pdf链接；支持指定语种出参内容；
  - **packingType** `integer` **必填** — 备货单类型；
  - **orderNoList** `string[]` **必填** — 关联的备货单列表；
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/shipping/delivery/print-package' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
 "deliveryNo": "20231109100004"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "packingType": 2,
    "orderNoList": [
      "B231114500244",
      "B231114500299"
    ],
    "url": "https://html2pdf.oss-cn-shenzhen.aliyuncs.com/pdf2-test/gmp/2024/3/15/1710468575962-1ef06e76916803df2de67c2cdc6f40f9.oss.pdf?AWSAccessKeyId=LTAI5tLUgHZGZqEUN2t8bPCR&Expires=1710470376&Signature=<REDACTED>"
  }
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001293。