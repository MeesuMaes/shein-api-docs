# 价格证明材料上传

`POST /open-api/goods/discuss/upload-discuss-file`

**QPS**：10 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v5 ｜ **更新时间**：2026-07-02 20:28:04 ｜ **所属权限包**：[议价单管理](/packages/negotiation)、[商品管理](/packages/goods) ｜ **官方文档**：[3001886](https://open.sheincorp.com/documents/apidoc/detail/3001886)

## 接口说明

上传议价单、更新成本价、SKU建议零售价中需要使用的文件。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400

## 请求参数

- **file** `blob` **必填** — 本地文件。 type=1（议价单辅助材料）时，仅支持图片，最大10M。 type=4（SKU建议零售价证明材料）时，仅支持jpg、jpeg、png、pdf，，最大10M。 type=5（成本价涨价辅助材料）时，支持上传 jpg / jpeg / png / pdf / csv / xls / xlsx，最大10M。

## 响应参数

- **code** `string` — 响应码 例: `0`
- **msg** `string` — 响应信息 例: `OK`
- **info** `object` **必填** — 上传结果
  - **objectKey** `string` — 文件唯一标识key。 例: `dpas251106-3815674784289616639.jpeg`
  - **url** `string` — 文件url。 例: `https://file.ltwebstatic.com/dpas-prod/dpas251106-3815674784289616639.jpeg?Expir`
- **bbl** `json`
- **traceId** `string` — 追踪码 例: `1c419793c5f28764`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/discuss/upload-discuss-file?type=1' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1762484930853' \
--header 'language: zh-cn' \
--header 'Host: openapi.sheincorp.com' \
--form 'file=@"cmMtdXBsb2FkLTE3NjI0MTQwMjE2MDktMg==/filename.jpg"'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "objectKey": "dpas251107-7150871783334178560.jpg",
    "url": "https://file.ltwebstatic.com/dpas-prod/dpas251107-7150871783334178560.jpg?Expires=1765076931&Signature=<REDACTED>&AccessKeyId=<REDACTED>"
  },
  "bbl": null,
  "traceId": "16d42bd414ac9f73"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001886。