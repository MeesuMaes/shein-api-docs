# 商家库存查询接口

`POST /open-api/stock/stock-query`

**QPS**：50 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v17 ｜ **更新时间**：2026-04-27 20:38:29 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment)、[库存同步](/packages/inventory-sync) ｜ **官方文档**：[3001695](https://open.sheincorp.com/documents/apidoc/detail/3001695)

## 接口说明

支持通过sku、skc、spu查询库存数量
请求参数：请注意，skuCodeList/skcNameList/spuNameList三个参数不能全部为空，至少传入一个
invType为新增参数，用于更准确地表达库存类型。原warehouseType参数将于2026年12月31日废弃下线，建议尽快切换至invType。过渡期内两个参数可同时使用，当同时传入时以invType为准。

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **skuCodeList** `string[]` — SHEIN生成SKU 最多传100个，skuCodeList/skcNameList/spuNameList ，请确保三个参数有且只有1个不为空；
- **skcNameList** `string[]` — SHEIN生成SKC，skuCodeList/skcNameList/spuNameList ，请确保三个参数有且只有1个不为空；
- **spuNameList** `string[]` — SHEIN生成SPU，skuCodeList/skcNameList/spuNameList ，请确保三个参数有且只有1个不为空；
- **warehouseType** `string` **必填** — 仓库类型；1:查备货在SHEIN仓的库存/ 2:查半托管，自主运营模式的虚拟库存/ 3:查代运营（全托管）、SHEIN自营模式的虚拟库存
- **invType** `string` — 库存类型，PI：SHEIN仓实物库存，VI：商家虚拟库存，JI：商家JITJIT库存

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **goodsInventory** `object[]` **必填** — 商品库存
    - **spuName** `string` **必填** — SHEIN spu 编码
    - **skcName** `string` **必填** — SHEIN skc 编码
    - **skuList** `object[]` **必填** — sku库存数据
      - **skuCode** `string` **必填** — SHEIN sku 编码
      - **totalInventoryQuantity** `integer` **必填** — 查询sku仓库库存汇总
      - **totalLockedQuantity** `integer` **必填** — 查询sku仓库锁定库存汇总
      - **totalTempLockQuantity** `integer` **必填** — 查询sku仓库临时锁库存汇总
      - **totalUsableInventory** `integer` **必填** — 查询sku仓库可用库存汇总
      - **totalOutOfStockQty** `integer` — 查询已付款未转急采单的缺货需求数汇总；仅适用代运营，SHEIN自营的急采业务
      - **totalTransitQuantity** `integer` — 查询sku仓库在途库存汇总
      - **warehouseInventoryList** `object[]` **必填** — 具体仓库数据
        - **inventoryQuantity** `integer` **必填** — 仓库库存数
        - **lockedQuantity** `integer` **必填** — 仓库锁定库存
        - **tempLockQuantity** `integer` **必填** — 仓库临时锁库存
        - **usableInventory** `integer` **必填** — 仓库可用库存
        - **outOfStockQty** `string` — 仓库已付款未转急采单的缺货需求数汇总；仅适用代运营，SHEIN自营的急采业务
        - **warehouseCode** `string` **必填** — 仓库编码
        - **warehouseType** `string` **必填** — 仓库类型
        - **transitQuantity** `integer` — 仓库在途库存
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/stock/stock-query' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
    "skuCodeList": ["I1omh30jb5ld"],
    "warehouseType": 2
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "goodsInventory": [
        {
          "spuName": "MM2402234440",
          "skcName": "sMM24022344403001",
          "skuList": [
            {
              "skuCode": "I1omh30jb5ld",
              "totalInventoryQuantity": 999,
              "totalLockedQuantity": 2,
              "totalUsableInventory": 997,
              "totalTempLockQuantity": 0,
              "warehouseInventoryList": [
                {
                  "warehouseCode": "PS0618098174",
                  "warehouseType": "2",
                  "inventoryQuantity": 999,
                  "lockedQuantity": 2,
                  "usableInventory": 997,
                  "tempLockQuantity": 0
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001695。