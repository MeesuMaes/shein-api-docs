# 查询商品可退库存数

`POST /open-api/purchase/returnable-inventory`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v3 ｜ **更新时间**：2026-06-12 10:39:19 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001805](https://open.sheincorp.com/documents/apidoc/detail/3001805)

## 接口说明

查询指定商品在仓库中可退货或报废的库存数量

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **applyType** `integer` **必填** — 申请类型：1=退货 2=报废
- **queryType** `integer` **必填** — 发起维度：1=SKC；2=采购单号(开发者可忽略)；3=平台SKU
- **sellerOrderNos** `string[]` — 采购单号列表，queryType=2时必传，最多50个；开发者可忽略，API暂不支持通过采购单发起
- **skcNames** `string[]` — SKC列表，发起维度=SKC时必传，最多50个
- **skuCodes** `string[]` — 平台SKU列表，发起维度=平台SKU时必传，最多50个

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **data** `object[]`
    - **detailInfoList** `object[]` — SKU明细
      - **platformSku** `string` — 平台SKU
      - **sellerOrderNo** `string` — 卖家采购单号
      - **warehouseInfoList** `object[]` — 仓库库存明细
        - **ownershipInventoryList** `object[]` — 业务归属库存明细
          - **inventoryNum** `integer` — 库存数
          - **ownerCode** `string` — 货主
          - **ownershipType** `string` — 业务归属（SHEIN归属/商家归属）
        - **warehouseId** `integer` — 仓库ID
        - **warehouseName** `string` — 仓库名称
    - **sellerOrderNo** `string` — 卖家采购单号
    - **skcName** `string` — SKC
  - **meta** `object`
    - **count** `integer`
    - **customObj** `object`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/purchase/returnable-inventory' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570849017' \
--data-raw '{  
"applyType": 1,  
"queryType": 1,  
"skcNames": [    
    "ss25092374866787944"  
    ]  
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
        "skcName": "ss25092374866787944",
        "sellerOrderNo": null,
        "detailInfoList": [
          {
            "platformSku": "I521hc0tv9xq",
            "sellerOrderNo": null,
            "warehouseInfoList": [
              {
                "warehouseId": 129,
                "warehouseName": "美国新泽西谷仓发货仓",
                "ownershipInventoryList": [
                  {
                    "ownershipType": "商家归属",
                    "inventoryNum": 0
                  }
                ]
              },
              {
                "warehouseId": 1,
                "warehouseName": "佛山仓",
                "ownershipInventoryList": [
                  {
                    "ownershipType": "商家归属",
                    "inventoryNum": 383
                  }
                ]
              },
              {
                "warehouseId": 120,
                "warehouseName": "巴西圣保罗自营FBS仓一",
                "ownershipInventoryList": [
                  {
                    "ownershipType": "商家归属",
                    "inventoryNum": 0
                  }
                ]
              },
              {
                "warehouseId": 25,
                "warehouseName": "土耳其转发仓",
                "ownershipInventoryList": [
                  {
                    "ownershipType": "商家归属",
                    "inventoryNum": 0
                  }
                ]
              },
              {
                "warehouseId": 46,
                "warehouseName": "波兰发货仓",
                "ownershipInventoryList": [
                  {
                    "ownershipType": "商家归属",
                    "inventoryNum": 0
                  }
                ]
              },
              {
                "warehouseId": 31,
                "warehouseName": "巴西发货仓",
                "ownershipInventoryList": [
                  {
                    "ownershipType": "商家归属",
                    "inventoryNum": 0
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "meta": {
      "count": 1,
      "customObj": {}
    }
  },
  "bbl": {},
  "traceId": "ccfdc9f750a16fe5"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001805。