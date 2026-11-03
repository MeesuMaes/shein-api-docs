# 商品证书池创建/编辑

`POST /open-api/goods/save-or-update-certificate-pool`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v12 ｜ **更新时间**：2026-06-29 19:52:58 ｜ **所属权限包**：[上传商品证书](/packages/product-certificate) ｜ **官方文档**：[3001862](https://open.sheincorp.com/documents/apidoc/detail/3001862)

## 接口说明

该API支持创建或编辑商品证书池。当certificateDimension=1，说明该类型的证书需要绑定SKC，因此需要创建商品证书池。另外在创建商品证书池之后，开发者还需要调用绑定SKC接口来完成证书上传。
2026年7月开放平台已推出资质证书新接口，建议对接新接口，详细方案请参考文档。

## 请求头

- **language** `string` **必填** — language
- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **certificatePoolId** `int64` — 证书池id
- **certificateRelationInfoList** `object[]` — 证书关联字段 主要包括: 证书编号/证书更新提示时间/产品名称/电池信号/证书有效期等等
  - **certificateRelationNameId** `int64` — 关联字段名 检测机构/证书编号/证书更新提示时间/产品名称/电池信号/证书有效期等等
  - **certificateRelationValue** `string` — 当 inputType 为 3 或 4 时，需要通过该字段填写证书字段所需的自定义值。日期格式示例：2025-01-01 00:00:00
  - **certificateRelationValueId** `int64` — 关联字段值
- **certificateTypeId** `int64` **必填** — 证书类型id 注意：certificateTypeId=844（产品标识符）目前不支持通过API上传，请过滤此类证书。
- **certificateUrl** `string` **必填** — 证书文件地址
- **certificateUrlName** `string` **必填** — 证书文件名
- **otherCertificateRelationInfoList** `object[]` — 证书外部关联字段
  - **certificateRelationNameId** `int64` — 关联字段名 检测机构/证书编号/证书更新提示时间/产品名称/电池信号/证书有效期等等
  - **certificateRelationValue** `string` — 当 inputType 为 3 或 4 时，需要通过该字段填写证书字段所需的自定义值。日期格式示例：2025-01-01 00:00:00
  - **certificateRelationValueId** `int64` — 关联字段值

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
  - **certificatePoolId** `int64` — 证书池id, 发布商品时用于和skc进行证书绑定
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/save-or-update-certificate-pool' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751010107986' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
  "certificateRelationInfoList": [
    {
      "certificateRelationNameId": 2147483696,
      "certificateRelationValue": "",
      "certificateRelationValueId": 2147483746
    }
  ],
  "certificateTypeId": 4,
  "certificateUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc202401103648636.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240110T061443Z&X-Amz-SignedHeaders=host&X-Amz-Expires=431999&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>",
  "certificateUrlName": "test.jpeg",
  "otherCertificateRelationInfoList": []
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "certificatePoolId": 7781
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001862。