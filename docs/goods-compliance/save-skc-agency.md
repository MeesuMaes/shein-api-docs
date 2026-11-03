# 绑定SKC和代理公司

`POST /open-api/goods-compliance/save-skc-agency`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2025-06-27 14:51:00 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001172](https://open.sheincorp.com/documents/apidoc/detail/3001172)

## 接口说明

按要平台合规要求，绑定SKC和代理公司。
代理公司的整体解决方案，可点击查看文档。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400
- **x-lt-signature** `string` **必填** — 查看签名生成规则
- **language** `string` — 指定出参语种，默认中文；支持语种:英语:EN 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **skc** `string[]` **必填** — skc
- **agencyType** `integer` **必填** — 代理公司的一级类型。0-欧盟责任人；1-英国代理；2-美国代理；3-制造商
- **agencyId** `string` — 代理公司的ID。可通过查询申报公司列表获取agencyId。

## 响应参数

- **code** `string` — 响应码。正常为“0”。
- **msg** `string` — 响应信息。正常为“OK”。
- **traceId** `string` — 请求追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-compliance/save-skc-agency' \
--header 'x-lt-signature: test \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751006946539' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
    "skc":["dress1481203"],
    "agencyType":0,
    "agencyId":39141435
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": null,
  "traceId": "f19e4bcaa433aba3"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001172。