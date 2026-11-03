# 查询是否支持自定义属性值

`POST /open-api/goods/get-custom-attribute-permission-config`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 ｜ **文档版本**：v8 ｜ **更新时间**：2025-08-15 14:57:20 ｜ **所属权限包**：[商家服务-商品](/packages/merchant-goods)、[商品管理](/packages/goods) ｜ **官方文档**：[3001369](https://open.sheincorp.com/documents/apidoc/detail/3001369)

## 接口说明

查询某个分类是否可以自定义销售属性的属性值。
注意：并非所有商家、所有分类都可以自定义属性值。创建自定义属性值之前一定要先查询此接口确定X商家的Y分类可自定义属性值。

## 请求头

- **language** `string` **必填** — 默认返回中文多语言信息，支持语种：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br 例: `en`
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **category_id_list** `int64[]` **必填** — 末级分类ID，最多支持200个

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
- **code** `string` **必填** — Result(success: 0)
- **info** `object`
  - **data** `object[]` — 分类下销售属性信息
    - **attribute_id** `int64` — 属性id
    - **last_category_id** `int64` — 末级分类id
    - **has_permission** `integer` — 属性是否支持自定义属性值。1-支持；0-不支持
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/get-custom-attribute-permission-config' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "category_id_list": [
        2103
    ]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "data": [
      {
        "has_permission": 1,
        "last_category_id": 2103,
        "attribute_id": 27
      },
      {
        "has_permission": 1,
        "last_category_id": 2103,
        "attribute_id": 87
      }
    ],
    "meta": {
      "count": 2,
      "customObj": null
    }
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001369。