# 查询店铺站点和币种信息（新）

`POST /open-api/goods/query-site-list`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v15 ｜ **更新时间**：2025-07-17 14:45:31 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001249](https://open.sheincorp.com/documents/apidoc/detail/3001249)

## 接口说明

该API支持查询店铺售卖的站点和币种信息

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
- **code** `string` **必填** — result(success: 0)
- **info** `object`
  - **data** `object[]` — data
    - **main_site** `string` — 主站点
    - **main_site_name** `string` — 主站点名称
    - **sub_site_list** `object[]` — 子站点
      - **currency** `string` — 币种
      - **site_abbr** `string` — 站点缩写
      - **site_name** `string` — 站点名称
      - **site_status** `integer` — 站点店铺状态：0：未启用，1：启用
      - **store_type** `integer` — 店铺模式：1-平台类型，2-自营类型
      - **symbol_left** `string` — 货币左侧符号
      - **symbol_right** `string` — 货币右侧符号
  - **meta** `object` — meta
    - **count** `integer`
    - **customObj** `object`
- **msg** `string` — Error description, success: OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/query-site-list' \
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
        "main_site": "shein",
        "main_site_name": "SHEIN",
        "sub_site_list": [
          {
            "site_name": "SHEIN法国站",
            "site_abbr": "shein-fr",
            "site_status": 1,
            "store_type": 1,
            "currency": "EUR",
            "symbol_left": "",
            "symbol_right": "€"
          },
          {
            "site_name": "SHEIN西班牙站",
            "site_abbr": "shein-es",
            "site_status": 1,
            "store_type": 1,
            "currency": "EUR",
            "symbol_left": "",
            "symbol_right": "€"
          },
          {
            "site_name": "SHEIN德国站",
            "site_abbr": "shein-de",
            "site_status": 1,
            "store_type": 1,
            "currency": "EUR",
            "symbol_left": "",
            "symbol_right": "€"
          },
          {
            "site_name": "SHEIN意大利站",
            "site_abbr": "shein-it",
            "site_status": 1,
            "store_type": 1,
            "currency": "EUR",
            "symbol_left": "",
            "symbol_right": "€"
          },
          {
            "site_name": "SHEIN荷兰站",
            "site_abbr": "shein-nl",
            "site_status": 1,
            "store_type": 1,
            "currency": "EUR",
            "symbol_left": "",
            "symbol_right": "€"
          },
          {
            "site_name": "SHEIN波兰站",
            "site_abbr": "shein-pl",
            "site_status": 1,
            "store_type": 1,
            "currency": "PLN",
            "symbol_left": "",
            "symbol_right": "zł"
          },
          {
            "site_name": "SHEIN奥地利站",
            "site_abbr": "shein-at",
            "site_status": 1,
            "store_type": 1,
            "currency": "EUR",
            "symbol_left": "",
            "symbol_right": "€"
          }
        ]
      }
    ],
    "meta": {
      "count": 1,
      "customObj": null
    }
  },
  "bbl": null,
  "traceId": "bbfb5e663a06cfee"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001249。