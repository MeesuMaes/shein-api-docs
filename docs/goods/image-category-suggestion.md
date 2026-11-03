# 图文识别推荐类目

`POST /open-api/goods/image-category-suggestion`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v14 ｜ **更新时间**：2025-08-12 17:29:45 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001363](https://open.sheincorp.com/documents/apidoc/detail/3001363)

## 接口说明

支持通过商品图片或商品文本描述获取推荐类目，仅返回当前商家可用类目范围内的推荐类目。
可实现3种入参组合：仅图片、仅文本、图片+文本。

## 请求头

- **language** `string` **必填** — 支持返回的多语言报错信息，例如：language:en。英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **url** `string` — 图片url。可使用外部图片地址，仅支持格式JPG/JPEG/PNG，大小≤3MB。 url、productInfo，必须入参其中一个值，也可两个都入参。
- **productInfo** `string` — 商品的文案信息。可输入商品描述或商品名称等任意和商品相关的文本信息，不限语种，1000个字符内，不支持emoji。 url、productInfo，必须入参其中一个值，也可两个都入参。

## 响应参数

- **bbl** `object` — 响应异常时的bbl相关信息
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **data** `object[]` — 推荐结果。 通过仅图片/图片+文本入参时，推荐结果最多有3个，无推荐结果的情况也可能存在。 通过仅文本入参时，推荐结果可能会超过3个，其中可能存在分类名称相同的多个category_id。
    - **categoryId** `string` — 推荐的商品末级类目ID
    - **order** `integer` — 推荐排序。 通过仅图片/图片+文本入参时会有此值。
    - **vote** `integer` — 相似值。Vote值越高，则说明入参内容跟类目的相似度越高 通过仅图片/图片+文本入参时会有此值。
  - **meta** `object` — 元数据
    - **count** `integer` — 统计对象：categoryId
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/image-category-suggestion' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1754986656203' \
--header 'language: en' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{

    "url":"https://m.media-amazon.com/images/I/818KIweHGaL._AC_SX679_.jpg",
    "productInfo":"12 Inch Round Woven Placemats Set of 8, VIBRATITE Jute Rope Braided Table Mats, Boho Farmhouse Rustic Woven Tassel Place Mats for Indoor and Outdoor Dining Table, Party, Kitchen Decor"

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
        "categoryId": "8642",
        "order": 1,
        "vote": 8
      },
      {
        "categoryId": "13011",
        "order": 2,
        "vote": 2
      }
    ],
    "meta": {
      "count": 2,
      "customObj": null
    }
  },
  "bbl": null,
  "traceId": "4dd3812a348d1f5b"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001363。