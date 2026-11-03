# 上传证书文件

`POST /open-api/goods/upload-certificate-file`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v7 ｜ **更新时间**：2026-06-29 19:52:53 ｜ **所属权限包**：[上传商品证书](/packages/product-certificate) ｜ **官方文档**：[3001861](https://open.sheincorp.com/documents/apidoc/detail/3001861)

## 接口说明

该API支持将本地文件转成SHEIN要求的在线URL。
2026年7月开放平台已推出资质证书新接口，建议对接新接口，详细方案请参考文档。

## 请求头

- **language** `string` **必填** — language
- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **file** `string` **必填** — file；单个20M以内、格式为PDF/PNG/JPG/JPEG的文件上传

## 响应参数

- **bbl** `object` — 响应异常时的bbl相关信息
  - **info** `object`
    - ***** `object[]`
      - **key** `string`
      - **npid** `string`
      - **tag** `string`
      - **value** `string`
  - **npid** `string`
- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **certificateUrl** `string` — 证书url地址
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/upload-certificate-file' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751009780680' \
--header 'language: zh-cn' \
--header 'Host: openapi.sheincorp.com' \
--form 'file=@"cmMtdXBsb2FkLTE3NTA4MzM4OTk3NzgtMTY=/test file.jpeg"'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "certificateUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc2905843696225904640.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250627T073621Z&X-Amz-SignedHeaders=host&X-Amz-Expires=432000&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>",
    "imageMd5": "1706e04c14c7d08d16f788327d9cea4a"
  },
  "bbl": null,
  "traceId": "6d46a5a85bbe5869"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001861。