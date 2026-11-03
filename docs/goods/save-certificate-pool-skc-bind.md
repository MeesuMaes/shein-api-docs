# SKC绑定商品证书池

`POST /open-api/goods/save-certificate-pool-skc-bind`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v8 ｜ **更新时间**：2026-06-29 19:53:44 ｜ **所属权限包**：[上传商品证书](/packages/product-certificate) ｜ **官方文档**：[3001864](https://open.sheincorp.com/documents/apidoc/detail/3001864)

## 接口说明

该API支持商品证书池与商品绑定（SKC维度）。当certificateDimension=1，说明该类型的证书需要绑定SKC，因此在创建商品证书池后，需要调用该接口完成证书上传。
2026年7月开放平台已推出资质证书新接口，建议对接新接口，详细方案请参考文档。

## 请求头

- **language** `string` **必填** — language
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **skcCertificatePoolRelationList** `object[]` **必填** — SKC和证书池证书绑定关系集合
  - **certificatePoolIdList** `int64[]` **必填** — 证书池ID集合
  - **skcName** `string` **必填** — SHEIN平台生成的SKC，对应商品发布的skc_name
  - **spuName** `string` **必填** — SHEIN平台生成的SPU，对应商品发布的spu_name

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
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/save-certificate-pool-skc-bind' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751010761337' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
  "skcCertificatePoolRelationList": [
    {
      "spuName": "s2409195445",
      "skcName": "ss24091954454649",
      "certificatePoolIdList": [
        9867,
        9817
      ]
    },
    {
      "spuName": "s2409199897",
      "skcName": "ss24091998977394",
      "certificatePoolIdList": [
        9867,
        9817
      ]
    }
  ]
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

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001864。