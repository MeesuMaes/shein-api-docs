# SKC绑定资质证书

`POST /open-api/goods-certificates/bind`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v2 ｜ **更新时间**：2026-06-29 19:37:34 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001854](https://open.sheincorp.com/documents/apidoc/detail/3001854)

## 接口说明

商品绑定资质证书。资质证书接口完整方案，详见文档。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 响应msg的语种。不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **poolSn** `string` **必填** — 资质证书池编号。有两种获取方式： 1、通过接口/open-api/goods-certificates/search获取店内所有资质证书的poolSn。 2、创建资质证书后响应体中返回的poolSn。
- **skcNames** `string[]` **必填** — 需要绑定的SKC列表，使用平台编码，单次最多200个。

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `string` — 响应信息
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-certificates/bind' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: EED6AEEA6B4741EF94D29FED5A1CE76F' \
--header 'x-lt-timestamp: 1782373994686' \
--header 'language: en' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "poolSn": "ocp3430864767736721408",
  "skcNames": [
    "s125051274104425433"
  ]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": null,
  "bbl": null,
  "traceId": "8b8c48adf33b137a"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001854。