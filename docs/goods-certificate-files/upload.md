# 上传资质证书文件

`POST /open-api/goods-certificate-files/upload`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v2 ｜ **更新时间**：2026-06-29 19:35:00 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001852](https://open.sheincorp.com/documents/apidoc/detail/3001852)

## 接口说明

可将本地文件转换为SHEIN的文件链接，用于创建/更新资质证书中的文件内容。
完整的资质证书调用方案，详见文档

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 响应msg的语种。不传时默认为中文，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **file** `blob` **必填** — file；单个20M以内、格式为PDF/PNG/JPG/JPEG的文件上传

## 响应参数

- **code** `string` **必填** — 响应编码成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 响应体
  - **certificateMd5** `string` — 文件的MD5
  - **certificateUrl** `string` — 文件的URL
  - **code** `integer` — 响应码。0-成功，1-失败
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-certificate-files/upload' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1782443314833' \
--header 'language: US' \
--header 'Host: openapi.sheincorp.com' \
--form 'file=@"cmMtdXBsb2FkLTE3ODA4ODk0NTg3ODItMjk=/方块图.jpeg"'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "code": 0,
    "certificateUrl": "https://lt-pqms.oss-cn-shenzhen.aliyuncs.com/TEST.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260626T030837Z&X-Amz-SignedHeaders=host&X-Amz-Expires=432000&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>",
    "certificateMd5": "TEST14c7d08d16f788327d9cea4a"
  },
  "bbl": null,
  "traceId": "bfa4d0631f0c1783"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001852。