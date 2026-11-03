# 查询店铺信息

`POST /open-api/openapi-business-backend/query-store-info`

**QPS**：50 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v12 ｜ **更新时间**：2025-12-18 10:34:59 ｜ **所属权限包**：[店铺信息查询](/packages/shop-info) ｜ **官方文档**：[3001499](https://open.sheincorp.com/documents/apidoc/detail/3001499)

## 接口说明

查询店铺的基本信息，如商家id、店铺状态及店铺可发布商品数量

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **storeInfo** `object` — 店铺信息
    - **storeName** `string` — 店铺名称；仅自运营，半托管会返回；
    - **storeStatus** `integer` — 店铺状态 0：停用 1：启用；仅自运营，半托管会返回；
    - **supplierId** `int64` — 商家id
    - **supplierBusinessMode** `string` — 商家业务类型。只有特殊的商家此字段才会有值。 POP-US:美国POP店；POP-GLOBAL:跨境POP店；SFS:商家既要备货又要管理客单
  - **storeProductQuota** `object` — 店铺发品可用额度
    - **availableLimit** `integer` — 可用额度
    - **totalLimit** `integer` — 总额度
    - **usedQuota** `integer` — 已用额度
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/openapi-business-backend/query-store-info' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570849017' \
--data-raw '{
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "storeProductQuota": {
      "totalLimit": 9999,
      "availableLimit": 9999,
      "usedQuota": 0
    },
    "storeInfo": {
      "supplierId": 21871704,
      "storeName": null,
      "storeStatus": null
    }
  },
  "traceId": "a5ba1bf917495ab9"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001499。