# 上传实拍图图片

`POST /open-api/goods-compliance/upload-skc-label-picture`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2025-06-27 15:10:05 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001176](https://open.sheincorp.com/documents/apidoc/detail/3001176)

## 接口说明

SKC绑定实拍图时需要使用图片URL，请使用此接口上传本地图片获取URL。
实拍图场景整体解决方案，可点击查看文档。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400
- **x-lt-signature** `string` **必填** — 查看签名生成规则
- **language** `string` — 指定出参语种，默认中文；支持语种:英语:EN 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **file** `blob` — 本地图片文件。图片长宽均不能超过8000px、大小不超过10M，支持png/jpeg/jpg格式

## 响应参数

- **code** `string` — 响应码。正常为“0”。
- **msg** `string` — 响应信息。正常为“OK”。
- **info** `object` — 响应详细信息
  - **imageUrl** `string` — 图片地址，绑定SKC时需要使用。
  - **imageMd5** `string` — 图片信息要素，绑定SKC时需要使用。
  - **msg** `string` — 上传响应信息
  - **code** `integer` — 上传响应编码
- **traceId** `string` — 请求追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-compliance/upload-skc-label-picture' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751008118526' \
--header 'language: zh-cn' \
--header 'Host: openapi.sheincorp.com' \
--form 'file=@"cmMtdXBsb2FkLTE3NTA4MzM4OTk3NzgtMTM=/test pic.jpeg"'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "imageUrl": "https://lt-pqms.oss-cn-shenzhen.aliyuncs.com/gpc2831944489401059568.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250504T080405Z&X-Amz-SignedHeaders=host&X-Amz-Expires=432000&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>",
    "imageMd5": "f39f332f054cf958c9ba4367dce9b1d0",
    "msg": null,
    "code": 0
  },
  "traceId": "ed02f5adb2158378"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001176。