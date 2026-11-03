# 商品打印条码

`POST /open-api/goods/print-barcode`

**QPS**：15 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v17 ｜ **更新时间**：2026-03-31 21:27:36 ｜ **所属权限包**：[商家服务-商品](/packages/merchant-goods)、[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3001653](https://open.sheincorp.com/documents/apidoc/detail/3001653)

## 接口说明

使用该API打印商品条码

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文。支持语种，英语：US，法语：FR，西班牙语：ES，德语：DE，中文简体：CN，泰语：TH，巴西葡语：PT，土耳其语：TR

## 请求参数

- **data** `object[]` **必填**
  - **orderNo** `string` **必填** — 采购单号
  - **supplierSku** `string` — 卖家sku编码和sheinSku必填其中一项，推荐使用sheinSku
  - **printNumber** `integer` **必填** — 数组此字段累计打印份数不能超过2000个；定制急采单的场景使用急采单的下单数入参；
  - **sheinSku** `string` **必填** — sheinSku即sku_code，sku_code是商品发布SHEIN生成的系统编码
- **printContentType** `integer` — 指定条码展示内容（默认打印商家货号）；1:商家货号/ 2:商家sku编码
- **printFormatType** `integer` — 指定条码打印大小（仅巴西商家适用，非巴西商家默认打印20*70）；1:打印20*70/ 2:打印25*40

## 响应参数

- **code** `string` **必填** — code=0成功，code =1失败；失败时失败信息在msg字段，如果errorData不为空,说明存在不符合打印的条件, 报错明细需重新核对
- **msg** `string` **必填**
- **info** `object` **必填**
  - **url** `string` — 商品条码的url，如果errorData不为空，则字段为空，打印内容支持指定语种出参；
  - **errorData** `object[]` — 错误信息
    - **orderNo** `string` **必填** — 入参的订单号
    - **supplierSku** `string` **必填** — 卖家sku编码
    - **errorMsg** `string[]` **必填** — 错误提示明细；支持指定语种出参；
    - **printNumber** `integer` **必填** — 入参的打印份数，此字段累计打印份数不能超过2000个
    - **sheinSku** `string` **必填** — sheinSku即sku_code，sku_code是商品发布SHEIN生成的系统编码
  - **codingInfoList** `object[]` — 查询成功返回编码信息
    - **orderNo** `string` **必填** — 订单号
    - **supplierSku** `string` — 卖家sku编码
    - **sheinSku** `string` **必填** — sheinSku即sku_code，sku_code是商品发布SHEIN生成的系统编码
    - **barcode** `string` — barcode条码；定制商品无需关注
    - **customCodingList** `object[]` — 定制商品二维码编码值
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/print-barcode' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "type": 2,
    "data": [
        {
            "orderNo": null,
            "supplierSku": null,
            "printNumber": 1,
            "sheinSku": "I94higsnyh7g"
        }
    ]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "url": "https://html2pdf.oss-cn-shenzhen.aliyuncs.com/pdf2-test/wmd/2024/3/21/1711013716497-32120d0bf83fd7c2e69095e9412e5647.oss.pdf?AWSAccessKeyId=LTAI5tLUgHZGZqEUN2t8bPCR&Expires=1711015516&Signature=<REDACTED>",
    "errorData": [],
    "codingInfoList": [
      {
        "orderNo": "J231019600453",
        "supplierSku": "test_0318",
        "sheinSku": "I9ii6m6za3e7",
        "customCodingList": [
          "#1001172157#1I9ii6m6za3e7oVwnm4M#4284554690725891",
          "#1001172157#1I9ii6m6za3e7oVwnm4Q#4284554880772097"
        ],
        "barcode": null
      }
    ]
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001653。