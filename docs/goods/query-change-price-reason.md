# 获取成本价涨价原因枚举值

`POST /open-api/goods/query-change-price-reason`

**QPS**：50 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v3 ｜ **更新时间**：2026-07-02 20:27:59 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001885](https://open.sheincorp.com/documents/apidoc/detail/3001885)

## 接口说明

此接口获取到的枚举值，可用在更新成本价接口（/open-api/goods/update-cost）的涨价原因change_price_reason_flag

## 请求头

- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **list** `object[]` **必填** — 要查询的skc列表
  - **skc_name** `string` **必填** — skc平台编码 例: `sf260119193661977368102`

## 响应参数

- **msg** `string` — 响应信息。正常为OK 例: `OK`
- **code** `string` — 响应code。正常为0 例: `0`
- **info** `object` **必填** — 响应详情
  - **list** `object[]` **必填** — skc列表
    - **skcName** `string` — skc编码 例: `sf260119193661977368102`
    - **changeReasonList** `object[]` **必填** — skc可用的涨价原因列表
      - **reasonCode** `integer` — 涨价原因code 例: `1`
      - **reasonDesc** `string` — 涨价原因描述，支持多语言返回，语种为header中的language。 例: `Decorative techniques and mold price increase`
- **traceId** `string` — 追踪码 例: `20a9213c89e86b66`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods/query-change-price-reason' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1776669719924' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "list":[
        {
            "skc_name":"sf260119193661977368102"
        }
    ]
}'
```

### 响应示例

```json
{
  "msg": "OK",
  "code": "0",
  "bbl": null,
  "info": {
    "list": [
      {
        "skcName": "sf260119193661977368102",
        "changeReasonList": [
          {
            "reasonCode": 1,
            "reasonDesc": "Decorative techniques and mold price increase"
          },
          {
            "reasonCode": 2,
            "reasonDesc": "Auxiliary materials price increase"
          },
          {
            "reasonCode": 3,
            "reasonDesc": "Reintroduction of style"
          },
          {
            "reasonCode": 4,
            "reasonDesc": "Style optimization"
          },
          {
            "reasonCode": 5,
            "reasonDesc": "Price approval"
          },
          {
            "reasonCode": 6,
            "reasonDesc": "Traceable cotton fabric price increase"
          },
          {
            "reasonCode": 7,
            "reasonDesc": "Supplier price error"
          },
          {
            "reasonCode": 8,
            "reasonDesc": "Merchandiser price error"
          },
          {
            "reasonCode": 9,
            "reasonDesc": "Quantity adjustment"
          },
          {
            "reasonCode": 10,
            "reasonDesc": "Process/procedure shortage"
          },
          {
            "reasonCode": 11,
            "reasonDesc": "Fabric price increase"
          },
          {
            "reasonCode": 12,
            "reasonDesc": "Alıcı yanlış fiyatı korur"
          }
        ]
      }
    ]
  },
  "traceId": "20a9213c89e86b66"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001885。