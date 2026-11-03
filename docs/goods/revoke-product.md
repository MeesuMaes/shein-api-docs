# 撤回商品审核

`POST /open-api/goods/revoke-product`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v4 ｜ **更新时间**：2026-07-02 21:00:01 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001896](https://open.sheincorp.com/documents/apidoc/detail/3001896)

## 接口说明

该接口支持根据spu撤回在审核中的商品，审核通过的商品无法撤回。

## 请求头

- **language** `string` **必填** — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 支持传参： 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br
- **Content-Type** `string` **必填** — application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **spuName** `string` **必填** — spuName，商品发布成功后返回的spuName

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **failCount** `integer` — 失败数
  - **failList** `object[]` — 失败结果
    - **documentSn** `string` — 公文号
    - **msg** `string` — 错误信息
    - **skcName** `string` — skcName，商品发布成功后返回的skcName
  - **successCount** `integer` — 成功数
  - **successList** `object[]` — 成功结果
    - **documentSn** `string` — 公文号
    - **skcName** `string` — skcName，商品发布成功后返回的skcName
  - **total** `integer`
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/revoke-product' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
   "spuName": "s2502064450"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "successList": [
      {
        "documentSn": "SPMPA420250211000105",
        "skcName": "ss25021193534484"
      },
      {
        "documentSn": "SPMPA420250211000104",
        "skcName": "ss25021193538318"
      }
    ],
    "failList": [],
    "total": 2,
    "successCount": 2,
    "failCount": 0
  },
  "bbl": null,
  "traceId": "c5374300f0a2e5f4"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001896。