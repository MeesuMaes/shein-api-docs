# 查询SKC的代理公司绑定要求

`POST /open-api/goods-compliance/skc-agency-detail`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v5 ｜ **更新时间**：2026-06-29 19:38:36 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001855](https://open.sheincorp.com/documents/apidoc/detail/3001855)

## 接口说明

查询哪些SKC需要绑定哪些类型的代理公司，以及当前的绑定状态（此接口已有新接口承接，建议优先对接新接口：/open-api/goods-compliance-requirements/list）

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400
- **x-lt-signature** `string` **必填** — 查看签名生成规则
- **language** `string` — 指定出参语种，默认中文；支持语种:英语:EN 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **pageSize** `integer` **必填** — 每页条数，最多100
- **pageNum** `integer` **必填** — 分页页数，建议从1开始查询
- **skcList** `string[]` — SKC，支持批量查询
- **skcShelfStatusList** `integer[]` — 筛选SKC上下架状态。0-待上架,SKC状态。 1-已上架,2-已下架,3-售罄
- **reviewStatusList** `integer[]` — 筛选SKC和代理公司的绑定状态。 1-待绑定；2-待审核（商家后台会显示绑定成功，API层也可理解为绑定成功）；3-绑定失败；4-绑定成功。 若需要查询商家当前急需操作的SKC，建议入参1/3
- **isRequired** `integer` — 筛选SKC是否必须绑定某类型的代理公司。 0-否, 1-是, 10-未知（此为瞬时状态，新SKC生成时的瞬间状态）

## 响应参数

- **code** `string` — 响应码。正常为“0”。
- **msg** `string` — 响应信息。正常为“OK”。
- **info** `object[]` — 响应详情
  - **skc** `string` — SKC
  - **reviewState** `integer` — SKC和某类型代理公司的绑定状态。1-待绑定；2-待审核（商家后台会显示绑定成功，API层也可理解为绑定成功）；3-绑定失败；4-绑定成功
  - **agencyType** `integer` — SKC需绑定/已绑定的代理公司一级类型。0-欧代；1-英代；2-美代；3-生产制造商；
- **traceId** `string` — 请求追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-compliance/skc-agency-detail' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751006598999' \
--header 'language: zh-cn' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
    "pageSize":10,
    "pageNum":1,
    "skcList":["s24124352242434353"]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "skc": "dress14081203",
      "reviewState": 4,
      "agencyType": 0
    },
    {
      "skc": "dress14081203",
      "reviewState": 2,
      "agencyType": 3
    },
    {
      "skc": "dress14081203",
      "reviewState": 2,
      "agencyType": 2
    },
    {
      "skc": "dress14081203",
      "reviewState": 4,
      "agencyType": 1
    }
  ],
  "traceId": "c3a742cfc3655f98"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001855。