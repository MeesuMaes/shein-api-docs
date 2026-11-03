# 确认商品是否可编辑

`POST /open-api/goods/product/check-edit-permission`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v1 ｜ **更新时间**：2025-08-28 14:46:52 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001380](https://open.sheincorp.com/documents/apidoc/detail/3001380)

## 接口说明

编辑商品前请调用接口确认商品是否可编辑，可编辑的商品需要满足以下条件：
1、商品已首次发布且通过平台审核。（首次发布的SPU下有多个SKC，只要有1个SKC审核通过，SPU就算审核通过）
2、在满足1的情况下若要对商品发起编辑，则商品当前不应该处于审核公文中。即SPU发布成功后，发起编辑生成了公文A，在A没有审核结果之前，SPU不可再次编辑。

## 请求头

- **Content-Type** `string` — application/json
- **x-lt-openKeyId** `string` — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` — 接口签名
- **language** `string` — 响应信息语种。 不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **spuName** `string` **必填** — 平台生成的SPU唯一编码

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object` — 商品编辑资格信息
  - **editable** `boolean` — 商品是否可编辑。 true-可编辑；false-不可编辑。
  - **reason** `string` — 不可编辑的原因。只有当editable=false时才会有值。
- **msg** `string` — 响应信息。成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/product/check-edit-permission' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1756362653696' \
--header 'language: CN' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
    "spuName":"r24152505587"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "reason": "SPU下存在审核中的SKC，请在审核完成后再进行编辑。",
    "editable": false
  },
  "traceId": "f923e287b37a1c60"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001380。