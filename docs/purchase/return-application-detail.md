# 查询退货申请单商品明细

`POST /open-api/purchase/return-application-detail`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v3 ｜ **更新时间**：2026-06-09 14:51:56 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001798](https://open.sheincorp.com/documents/apidoc/detail/3001798)

## 接口说明

查询指定退货申请单的商品明细

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **bblLang** `string` 例: `random_bblLang`
- **page** `integer` — 页码，不传默认1 例: `12`
- **pageSize** `integer` — 分页大小，1-100，不传默认20 例: `12`
- **returnPlanNo** `string` **必填** — 退货申请单 例: `random_returnPlanNo`
- **skcNames** `string[]` — SKC 例: `random_skcNames`
- **skuCodes** `string[]` — 平台SKU 例: `random_skuCodes`
- **supplierCode** `string` — 货号 例: `random_supplierCode`
- **supplierSkus** `string[]` — 商家SKU 例: `random_supplierSkus`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` **必填** — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **data** `object[]`
    - **detailInfoList** `object[]` — 明细
      - **orderType** `integer` — 订单类型 例: `84`
      - **platformSku** `string` — 平台SKU 例: `random_platformSku`
      - **quantity** `integer` — 申请数量 例: `76`
      - **sellerOrderNo** `string` — 采购单号 例: `random_sellerOrderNo`
      - **subSuffixZh** `string` — 商品属性集 例: `random_subSuffixZh`
      - **supplierSku** `string` — 商家SKU 例: `random_supplierSku`
      - **warehouseId** `integer` — 备货仓库ID 例: `54`
      - **warehouseName** `string` — 备货仓库名称 例: `random_warehouseName`
    - **goodsThumb** `string[]` — 商品主图 例: `random_goodsThumb`
    - **skcCopyFlag** `integer` — 是否专供SHEIN：1-是，2-否 例: `69`
    - **skcMarkFlagName** `string` — skc退供标识 例: `random_skcMarkFlagName`
    - **skcName** `string` — SKC 例: `random_skcName`
    - **skcSlowMovingFlag** `integer` — 是否是不动销skc：1-是，2-否 例: `33`
    - **supplierCode** `string` — 货号 例: `random_supplierCode`
    - **totalApplyQuantity** `integer` — 合计 例: `72`
  - **meta** `object`
    - **count** `integer` 例: `14`
    - **customObj** `object`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/purchase/return-application-detail' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570849017' \
--data-raw '{
    "returnPlanNo": "JH26060300000009"
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
        "goodsThumb": [
          null
        ],
        "skcName": "sMM23121180897184",
        "skcCopyFlag": 2,
        "supplierCode": null,
        "detailInfoList": [
          {
            "subSuffixZh": "XL中文-1pc",
            "platformSku": "I6445ww5yg3u",
            "supplierSku": "asd1231231311",
            "quantity": 1,
            "warehouseName": "佛山仓",
            "warehouseId": 1,
            "sellerOrderNo": "J240408600020",
            "orderType": 1
          }
        ],
        "totalApplyQuantity": 1,
        "skcMarkFlagName": "",
        "skcSlowMovingFlag": 2
      },
      {
        "goodsThumb": [
          null
        ],
        "skcName": "sh2305166869555115",
        "skcCopyFlag": 2,
        "supplierCode": null,
        "detailInfoList": [
          {
            "subSuffixZh": "S",
            "platformSku": "I12vvgjg2osy",
            "supplierSku": "光滑浴室壁挂盒-透明-小号",
            "quantity": 1,
            "warehouseName": "佛山仓",
            "warehouseId": 1,
            "sellerOrderNo": "",
            "orderType": 0
          }
        ],
        "totalApplyQuantity": 1,
        "skcMarkFlagName": "",
        "skcSlowMovingFlag": 2
      },
      {
        "goodsThumb": [
          ""
        ],
        "skcName": "ss24013144626648",
        "skcCopyFlag": 2,
        "supplierCode": "jing001",
        "detailInfoList": [
          {
            "subSuffixZh": "XXXL-2pc",
            "platformSku": "I924qkl0nnk2",
            "supplierSku": "",
            "quantity": 1,
            "warehouseName": "佛山仓",
            "warehouseId": 1,
            "sellerOrderNo": "PB2604300000025-3",
            "orderType": 2
          }
        ],
        "totalApplyQuantity": 1,
        "skcMarkFlagName": "不动销sku退供哈哈",
        "skcSlowMovingFlag": 1
      },
      {
        "goodsThumb": [
          "http://imgdeal-test01.shein.com/v4/j/sxfs/2025/09/25/e8/1758787664a31d69f5789c9f6b2bf6b0d857f68dfe.jpg"
        ],
        "skcName": "ss25092374866787944",
        "skcCopyFlag": 2,
        "supplierCode": "12",
        "detailInfoList": [
          {
            "subSuffixZh": "blackk-单一尺寸",
            "platformSku": "I521hc0tv9xq",
            "supplierSku": "",
            "quantity": 1,
            "warehouseName": "佛山仓",
            "warehouseId": 1,
            "sellerOrderNo": "PB2604210000140-2",
            "orderType": 2
          }
        ],
        "totalApplyQuantity": 1,
        "skcMarkFlagName": "",
        "skcSlowMovingFlag": 2
      }
    ],
    "meta": {
      "count": 4,
      "customObj": {}
    }
  },
  "bbl": {},
  "traceId": "a91a1bc00a342d3b"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001798。