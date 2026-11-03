# 店铺证书池创建/编辑

`POST /open-api/goods/save-or-update-supplier-certificate`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v11 ｜ **更新时间**：2026-06-29 19:53:39 ｜ **所属权限包**：[上传商品证书](/packages/product-certificate) ｜ **官方文档**：[3001863](https://open.sheincorp.com/documents/apidoc/detail/3001863)

## 接口说明

该API支持创建或编辑店铺证书池。当certificateDimension=2时，说明该类型的证书为店铺维度的证书，不需要绑定SKC商品。因此，在创建店铺证书池后，即可完成店铺证书的上传。
2026年7月开放平台已推出资质证书新接口，建议对接新接口，详细方案请参考文档。

## 请求头

- **language** `string` **必填** — language
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **certificatePoolId** `int64` — 证书池id, 传了此值则执行更新，不传默认是新增
- **certificateTypeId** `int64` **必填** — 证书类型ID
- **certificateUrl** `string` **必填** — 证书文件地址
- **certificateUrlName** `string` **必填** — 证书文件名

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
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/save-or-update-supplier-certificate' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751010644959' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
    "certificatePoolId": 7108,
    "certificateTypeId": 135,
    "certificateUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc202401111845086.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240111T020804Z&X-Amz-SignedHeaders=host&X-Amz-Expires=431999&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>",
    "certificateUrlName": "16952760533746985150.jpeg"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": null,
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001863。