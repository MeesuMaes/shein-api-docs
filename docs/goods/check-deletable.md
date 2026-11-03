# 商品删除预校验

`POST /open-api/goods/check-deletable`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v1 ｜ **更新时间**：2026-07-03 13:41:11 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001904](https://open.sheincorp.com/documents/apidoc/detail/3001904)

## 接口说明

商品删除操作是SKC维度，SKC需要满足以下所有条件时才能被删除。以下的1、2、3三点可通过此接口校验知晓。4、5需要提交删除申请后以审核结果为准。
1、商家允许操作商品删除，并非所有商家都可删除商品。
2、商家每天最多删除500个SKC，删除时还有额度。
3、SKC已审核通过且没有被删除。
4、SKC不是【已上架】状态，即待上架、已下架、已售罄可删除。（即/open-api/goods/spu-info中，skc的shelfStatusInfoList中所有站点均为非上架状态）
5、SKC无未签收的订单、退货中的订单、无1年内有效订单。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **skc_name_list** `string[]` **必填** — SKC名称列表，最多50个

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 响应列表
  - **deletable_list** `string[]` — 可删除的SKC编码列表（满足1、2、3条件，条件说明见顶部）
  - **undeletable_list** `object[]` — 不可删除的SKC列表（不满足1、2、3条件，条件说明见顶部）
    - **code** `string` — 错误码
    - **reason** `string` — 错误描述
    - **skc_name** `string` — SKC平台编码
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/check-deletable' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1782892294436' \
--header 'language: en' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "skc_name_list":["sa25070805055561895","sa25073062627864751","sa250730626245345"]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "deletable_list": [
      "sa25070805055561895",
      "sa25073062627864751"
    ],
    "undeletable_list": [
      {
        "skc_name": "sa250730626245345",
        "code": "API_DEL_1003",
        "reason": "SKC does not exist or does not belong to the current seller"
      }
    ]
  },
  "bbl": null,
  "traceId": "a2a649ea59cc8f36"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001904。