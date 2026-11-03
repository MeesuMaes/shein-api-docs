# 商品列表接口

`POST /open-api/openapi-business-backend/product/query`

**QPS**：100 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v18 ｜ **更新时间**：2025-07-17 11:56:50 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001239](https://open.sheincorp.com/documents/apidoc/detail/3001239)

## 接口说明

该API支持查询已发布成功的商品列表数据，接口一次最多返回50000条数据。如果商家发布的商品数量超过50000条，请增加时间范围进行查询。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **pageNum** `integer` — 页面数量，默认：1
- **pageSize** `integer` — 页面大小，默认：50
- **insertTimeEnd** `string` — 商品上新的结束时间（商品首次审核通过），示例：2024-11-15 19:00:00
- **insertTimeStart** `string` — 商品上新的开始时间（商品首次审核通过）示例：2024-11-15 20:00:00
- **updateTimeEnd** `string` — 商品的更新结束时间（更新范围不仅是商品信息变动，包括系统内部更新时间）.示例：2024-11-15 19:00:00
- **updateTimeStart** `string` — 商品的更新开始时间（更新范围不仅是商品信息变动，包括系统内部更新时间）.示例：2024-11-15 19:00:00

## 响应参数

- **code** `string` — 编码(0:success)
- **info** `object`
  - **data** `object[]`
    - **skcName** `string` — skcName，skcName是SHEIN生成的系统编码
    - **skuCodeList** `string[]` — sku维度数据，一个skc下最多40个sku；skuCode，skuCode是SHEIN生成的系统编码
    - **spuName** `string` — spuName，spuName是SHEIN生成的系统编码
- **msg** `string` — 错误信息
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/openapi-business-backend/product/query' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752724525405' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "pageNum": 1, "pageSize": 50
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
        "skcName": "sM22040955900525",
        "skuCodeList": [
          "I065lggbkwpe",
          "I065lggbejle",
          "I065lggb9yr6",
          "I065lggbivg3",
          "I065lggbg9pt",
          "I065lggbclpa",
          "I065lggb4uy5"
        ],
        "spuName": "M2204095590"
      },
      {
        "skcName": "sM22120115814401",
        "skuCodeList": [
          "I9bqt81qmsv0"
        ],
        "spuName": "M2212011581"
      }
    ]
  }
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001239。