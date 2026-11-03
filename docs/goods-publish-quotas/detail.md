# 查询商家发品额度

`POST /open-api/goods-publish-quotas/detail`

**QPS**：60 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-09-04 10:21:42 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002025](https://open.sheincorp.com/documents/apidoc/detail/3002025)

## 接口说明

商家能否发品的条件之一：发品额度，每个商家每个月会定时更新额度。发品额度指：当前周期内可累计的发布且审核成功的SKC总数量。只要SKC审核通过，即使下架或删除都无法恢复发品额度。
建议开发者在提交发品信息前，先查询发品额度（SKC维度），如果本次提交的SKC数超过发品额度，则提醒商家删减SKC。
发品额度管控中存在“品牌豁免”情况，即如果商品是指定品牌的，则商品不计入发品额度，当商家发布品牌商品时，可在入参中加品牌进行查询。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识openKeyId，获取方式请查阅：授权手册。
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为将当前时间转换为毫秒值，即从1970年1月1日起至今的毫秒数，例如：1583398764000。
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则。
- **language** `string` — 用于指定返回错误信息的语种，默认返回中文。支持的语言代码如下：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **brand_code** `string` — 品牌code 例: `2pzl0`

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 商家可发品数查询响应
  - **isControlled** `boolean` — 是否管控发品额度。 部分情况不管控发品额度，若=false，则代表发品SKC数量无限制。若=true，则需要根据下方availableQuota进行判断。 例: `false`
  - **totalQuota** `integer` — 当前周期内发品总额度。isControlled=false时，值为null。
  - **availableQuota** `integer` — 剩余可发品数。isControlled=true时，此值必须大于0时才能发品。isControlled=false时，值为null。
  - **usedCount** `integer` — 已发品数。isControlled=false时，值为null。
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods-publish-quotas/detail' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1786330276239' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "availableQuota": null,
    "isControlled": false,
    "totalQuota": null,
    "usedCount": null
  },
  "bbl": null,
  "traceId": "1c1f9d02034792b4"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002025。