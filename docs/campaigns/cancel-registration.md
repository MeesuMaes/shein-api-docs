# 取消活动报名

`POST /open-api/campaigns/cancel-registration`

**QPS**：15 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v4 ｜ **更新时间**：2026-08-27 10:40:46 ｜ **所属权限包**：[营销活动报名](/packages/campaign) ｜ **官方文档**：[3001998](https://open.sheincorp.com/documents/apidoc/detail/3001998)

## 接口说明

本接口用于取消营销活动报名。当报名审核状态为“审核中”时，允许调用本接口进行取消操作。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则
- **language** `string` **必填** — 指定出参语种，支持语种：英语：US，中文简体：CN，葡语：PT，西班牙语：ES，土耳其语：TR，法语：FR，德语：DE，泰语：TH

## 请求参数

- **partakeGoodsIdList** `integer[]` **必填** — 报名记录ID（最多100个）。可通过查询报名记录列表接口获得。

## 响应参数

- **msg** `string` — 错误描述，成功：OK
- **code** `string` — 响应编码，成功：0
- **info** `object` — 响应数据
  - **failedList** `object[]` — 失败列表
    - **code** `integer` — 失败原因code
    - **reason** `string` — 失败原因说明
    - **partakeGoodsId** `integer` — 报名记录ID
  - **successList** `object[]` — 成功列表
    - **partakeGoodsId** `integer` — 报名记录ID
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://open.sheincorp.com/open-api/campaigns/cancel-registration' \
--header 'language: US' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1773049905972' \
--header 'Content-Type: application/json' \
--data-raw '{
  "partakeGoodsIdList": [
    100000000407502
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
    "successList": [
      {
        "partakeGoodsId": "100000000407502"
      }
    ]
  },
  "traceId": "e721fef78cbbb628"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001998。