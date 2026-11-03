# SHEIN 开放平台 API 文档

收录 **122** 个 Open API 接口，分属 **16** 个权限包。数据抓取自 SHEIN 开放平台官方文档，随官方更新重新生成。

## 使用说明

- 所有接口共用同一套请求头与签名机制，先看[快速接入](/quick-start)。
- 每个接口页包含：请求头、请求参数树（含必填标记与示例值）、响应参数树、请求/响应示例。
- 页面里的示例值多为官方占位数据，字段含义以“说明”列为准。

## 权限包

| 权限包 | 接口数 | 说明 |
| --- | --- | --- |
| [议价单管理](/packages/negotiation) | 3 | — |
| [商品视频](/packages/product-video) | 2 | — |
| [营销活动报名](/packages/campaign) | 6 | — |
| [店铺信息查询](/packages/shop-info) | 1 | — |
| [开发者接入](/packages/developer-access) | 1 | — |
| [商家服务-商品](/packages/merchant-goods) | 8 | — |
| [商品管理](/packages/goods) | 38 | — |
| [上传商品证书](/packages/product-certificate) | 7 | — |
| [商品合规资质](/packages/compliance) | 17 | — |
| [采购单履约](/packages/purchase-fulfillment) | 22 | — |
| [采购单退货解决方案](/packages/purchase-return) | 13 | — |
| [备货申请](/packages/stock-request) | 3 | — |
| [库存同步](/packages/inventory-sync) | 3 | — |
| [销量查询](/packages/sales-query) | 1 | — |
| [账单接口（全托&POP）](/packages/finance) | 3 | — |
| [获取定制信息](/packages/customization) | 5 | — |

## 跨权限包接口

10 个接口同时归属多个权限包，页面只收录一份，按首个权限包归类。

- [价格证明材料上传](/goods/discuss/upload-discuss-file) — 议价单管理、商品管理
- [查询是否支持自定义属性值](/goods/get-custom-attribute-permission-config) — 商家服务-商品、商品管理
- [商品打印条码](/goods/print-barcode) — 商家服务-商品、采购单履约
- [打印合规标签](/goods-compliance/label-print) — 商家服务-商品、商品管理、商品合规资质
- [根据SKU查询销量](/goods/query-sku-sales) — 采购单履约、销量查询
- [商家库存查询接口](/stock/stock-query) — 采购单履约、库存同步
- [全托管/SHEIN自营商家库存更新](/goods/stock-update) — 采购单履约、库存同步
- [手工下备货单](/idms/create-order) — 采购单履约、备货申请
- [备货单审核列表](/idms/review-orders) — 采购单履约、备货申请
- [查询商品备货信息列表](/openapi-business-backend/stock-goods-list) — 采购单履约、备货申请

## 无独立文档的路径

源权限表中以下路径为通配写法，官方没有对应文档页：

- `/open-api/goods/delete/**`（权限包：商品管理）
