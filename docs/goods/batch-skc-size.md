# 商品接口-根据条码批量获取SKC与尺码

`POST /open-api/goods/batch-skc-size`

**QPS**：60 ｜ **合作模式**：全托管 / SHEIN自营 ｜ **文档版本**：v11 ｜ **更新时间**：2025-12-18 10:31:55 ｜ **所属权限包**：[商家服务-商品](/packages/merchant-goods) ｜ **官方文档**：[3001485](https://open.sheincorp.com/documents/apidoc/detail/3001485)

## 接口说明

该API支持根据商家的条码批量获取SHEIN的 (skc和尺码)

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **data** `string[]` **必填** — 商品条码数组

## 响应参数

- **code** `double` — 响应码
- **msg** `string` — 响应信息
- **info** `object`
  - **key** `object` — 传入的商品条码参数,如参数传入S236711-39A,这里即为S236711-39A
    - **skc** `string` — skc即skc_name，是商品发布SHEIN生成的系统编码
    - **size** `string` — 尺寸
    - **sku_code** `string` — sku_code，sku_code是商品发布SHEIN生成的系统编码
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/batch-skc-size' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "data": [
        "1001251036",
        "1001251037",
        "1001251040",
        "1001251042",
        "S521121-1Y",
        "S420866-86I"
    ]
}'
```

### 响应示例

```json
{
  "code": 0,
  "msg": "接口请求成功",
  "info": {
    "1001251036": {
      "skc": "s23111033121496",
      "size": "90D",
      "sku_code": "I83q7zm3axla"
    },
    "1001251037": {
      "skc": "s23111033121496",
      "size": "75A",
      "sku_code": "I83q7zm3c5db"
    },
    "1001251040": {
      "skc": "ss23111007205737",
      "size": "75A",
      "sku_code": "I83q8737spbk"
    },
    "1001251042": {
      "skc": "ss23111007205737",
      "size": "43",
      "sku_code": "I83q8737u0r6"
    },
    "S420866-86I": {
      "skc": "dress171226321",
      "size": "1XL",
      "sku_code": "I2fmtzyqyrlh"
    },
    "S521121-1Y": {
      "skc": "tee180628702",
      "size": "XS",
      "sku_code": ""
    }
  }
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001485。