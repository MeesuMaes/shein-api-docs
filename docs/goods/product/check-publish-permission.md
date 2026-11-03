# 确认店铺是否可发品

`GET /open-api/goods/product/check-publish-permission`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v3 ｜ **更新时间**：2026-02-06 18:06:06 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001589](https://open.sheincorp.com/documents/apidoc/detail/3001589)

## 接口说明

发布商品前调用接口，确认商家店铺是否有发布商品资格。店铺会因为多种原因导致无法发品，大多需要商家前往商家后台处理，此接口覆盖以下原因：
1、店铺已关闭。即无法运营。
2、店铺当前有禁止发品的违规单，需按平台建议处理。
3、店铺的部分站点KYC未完成，KYC认证后可发品。
4、自运营类型店铺的所有站点发货&退货地址未维护，维护后可发品。
5、自运营/半托管店铺的在架额度为0，全托管店铺的可发品额度为0。
6、店铺无可用的上架站点。

## 请求头

- **Content-Type** `string` — application/json
- **x-lt-openKeyId** `string` — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` — 接口签名
- **language** `string` — 响应msg的语种。 不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` **必填** — 响应编码。响应成功：0
- **info** `object` — 店铺发品资格信息
  - **canPublishProduct** `boolean` — 店铺是否可发品。 true-可发品；false-不可发品。
  - **reason** `string` — 不可发品的原因。只有当canPublishProduct=false时才有值。
- **msg** `string` — 响应信息,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi.sheincorp.com/open-api/goods/product/check-publish-permission' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1756362214844' \
--header 'language: CN' \
--header 'Host: openapi.sheincorp.com' \
--header 'Connection: keep-alive'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "canPublishProduct": false,
    "reason": "商家维护好站点的发货、退货地址后，才可发布商品。站点包括：shein-fr,shein-es,shein-de,shein-it,shein-nl,shein-se,shein-pl,shein-pt。请商家前往SHEIN后台维护地址。"
  },
  "traceId": "8f159ea3e8e0413c"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001589。