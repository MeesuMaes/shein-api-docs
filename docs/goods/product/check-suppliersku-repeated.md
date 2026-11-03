# 查询商家sku是否已存在

`POST /open-api/goods/product/check-supplierSku-repeated`

**QPS**：60 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v1 ｜ **更新时间**：2025-10-22 20:45:14 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001437](https://open.sheincorp.com/documents/apidoc/detail/3001437)

## 接口说明

平台要求商品的商家sku（即发布接口中的supplier_sku）在店铺内全局唯一。
建议在发布商品前调用，查询本次输入的商家sku是否在店内已存在（包括已发布商品以及审核中商品），如果已存在引导商家更换信息。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **supplierSkuList** `string[]` **必填** — 商家sku。单次最多可查询200个。 例: `34534543`

## 响应参数

- **code** `string` — 响应编码 成功：0 例: `0`
- **msg** `string` — 响应信息。成功：OK 例: `OK`
- **info** `object[]` **必填** — 详细信息
  - **supplierSku** `string` — 查询时入参的商家sku 例: `34534543`
  - **repeated** `boolean` — 是否已存在。 true=已存在；false=不存在 例: `false`
- **traceId** `string` — 追踪码 例: `ccc40d75be5a760e`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/product/check-supplierSku-repeated' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1761136234195' \
--header 'language: en' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
"supplierSkuList":["34534543","46fjdsfsdfsdlr"]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "supplierSku": "34534543",
      "repeated": false
    },
    {
      "supplierSku": "46fjdsfsdfsdlr",
      "repeated": false
    }
  ],
  "traceId": "ccc40d75be5a760e"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001437。