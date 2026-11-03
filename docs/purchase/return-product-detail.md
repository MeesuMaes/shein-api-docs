# 查询退货与报废单商品明细

`POST /open-api/purchase/return-product-detail`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v3 ｜ **更新时间**：2026-06-04 13:50:36 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001780](https://open.sheincorp.com/documents/apidoc/detail/3001780)

## 接口说明

查询退货单、报废中商品的明细信息

## 请求头

- **Content-Type** `string` — application/json
- **x-lt-openKeyId** `string` — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` — 接口签名

## 请求参数

- **page** `integer` — 页码，不传默认1 例: `69`
- **pageSize** `integer` — 分页大小，1-100，不传默认20 例: `95`
- **returnOrderNo** `string` **必填** — 查询的退货单号 例: `random_returnOrderNo`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **data** `object[]`
    - **details** `object[]` — 按平台sku的商品明细
      - **orderType** `integer` — 正常采购单类型，1-急采单，2-备货单，3-JIT备货单 例: `77`
      - **platformSku** `string` — 平台SKU 例: `random_platformSku`
      - **preReturnQuantity** `integer` — 预计退货数量 例: `3`
      - **returnQuantity** `integer` — 执行退货数量 例: `6`
      - **scrapQuantity** `integer` — 执行报废数量 例: `56`
      - **sellerDeliveryNo** `string` — 卖家发货单号 例: `random_sellerDeliveryNo`
      - **sellerOrderNo** `string` — 平台卖家单号 例: `random_sellerOrderNo`
      - **suffixZh** `string` — SKU属性集-销售属性拼接 例: `random_suffixZh`
      - **supplierSku** `string` — 商家SKU 例: `random_supplierSku`
    - **imgPath** `string` — 主图 例: `random_imgPath`
    - **preReturnQuantity** `integer` — 预计退货数量 例: `19`
    - **returnQuantity** `integer` — 执行退货数量 例: `37`
    - **scrapQuantity** `integer` — 执行报废数量 例: `39`
    - **skc** `string` — SKC 例: `random_skc`
    - **skcCopyFlag** `integer` — 是否专供SHEIN：1-是，2-否 例: `71`
    - **skcMarkFlagName** `string` — skc退供标识：1-是，2-否 例: `random_skcMarkFlagName`
    - **skcSlowMovingFlag** `integer` — 是否是不动销skc：1-是，2-否 例: `33`
    - **supplierCode** `string` — 货号 例: `random_supplierCode`
  - **meta** `object`
    - **count** `integer` 例: `43`
    - **customObj** `object`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/purchase/return-product-detail' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
  "returnOrderNo": "TG26010600020"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "data": [
      {
        "imgPath": "http://imgdeal-test01.shein.com/images3_pi/2023/11/07/a9/16993415152939413749.jpg",
        "skc": "ss21101356992632",
        "skcCopyFlag": 2,
        "supplierCode": "1232",
        "preReturnQuantity": 35,
        "returnQuantity": 0,
        "scrapQuantity": null,
        "details": [
          {
            "platformSku": "I71jhxynch7w",
            "supplierSku": "T-113",
            "suffixZh": "焦糖色-S",
            "preReturnQuantity": 20,
            "returnQuantity": 0,
            "scrapQuantity": null,
            "sellerOrderNo": "PB2601070000105",
            "sellerDeliveryNo": "VF260107000008",
            "orderType": 2,
            "pricingCurrencyId": null,
            "currencyCode": "",
            "price": null,
            "billCurrencyId": null,
            "billCurrencyCode": "",
            "salePrice": null,
            "salePriceMin": null,
            "salePriceMax": null
          },
          {
            "platformSku": "I23a7r204688",
            "supplierSku": "",
            "suffixZh": "焦糖色-L(中文)",
            "preReturnQuantity": 15,
            "returnQuantity": 0,
            "scrapQuantity": null,
            "sellerOrderNo": "PB2601070000105",
            "sellerDeliveryNo": "VF260107000008",
            "orderType": 2,
            "pricingCurrencyId": null,
            "currencyCode": "",
            "price": null,
            "billCurrencyId": null,
            "billCurrencyCode": "",
            "salePrice": null,
            "salePriceMin": null,
            "salePriceMax": null
          }
        ],
        "skcMarkFlagName": "",
        "skcSlowMovingFlag": 2,
        "showSalePrice": 2,
        "scrapConfig": {}
      }
    ],
    "meta": {
      "count": 1,
      "customObj": {}
    }
  },
  "bbl": {},
  "traceId": "3f3ffd6c76a3e23b"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001780。