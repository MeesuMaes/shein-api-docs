# 查询可用品牌列表

`POST /open-api/goods/query-brand-list`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v11 ｜ **更新时间**：2026-07-02 21:01:07 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001900](https://open.sheincorp.com/documents/apidoc/detail/3001900)

## 接口说明

该API支持查询店铺可用的品牌信息，店铺品牌会变动，请定期更新。

## 请求头

- **language** `string` **必填** — 默认返回中文多语言信息，支持语种：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br
- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
- **code** `string` **必填** — Result(success: 0)
- **info** `object`
  - **data** `object[]`
    - **brand_code** `string` — 品牌编码
    - **brand_name** `string` — 品牌名称
  - **meta** `object`
    - **count** `integer`
    - **customObj** `object`
- **msg** `string`
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/query-brand-list' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw ''
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "data": [
      {
        "brand_code": "2u1ys",
        "brand_name": "shein品牌"
      },
      {
        "brand_code": "2pg9i",
        "brand_name": "这是品牌"
      },
      {
        "brand_code": "24rjv",
        "brand_name": "品牌数据"
      },
      {
        "brand_code": "2nz97",
        "brand_name": "品牌111"
      }
    ],
    "meta": {
      "count": 4,
      "customObj": null
    }
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001900。