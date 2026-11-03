# 商品管理

共 38 个接口。

| 接口 | 方法 | 路径 | 更新 |
| --- | --- | --- | --- |
| [本地图片上传](/goods/upload-pic) | `POST` | `/open-api/goods/upload-pic` | 2025-08-12 11:32:25 |
| [查询店铺站点和币种信息（新）](/goods/query-site-list) | `POST` | `/open-api/goods/query-site-list` | 2025-07-17 14:45:31 |
| [查询店铺站点和站点币种（旧）](/openapi-business-backend/site/query) | `POST` | `/open-api/openapi-business-backend/site/query` | 2025-07-17 14:54:50 |
| [查询分类可用属性](/goods/query-attribute-template) | `POST` | `/open-api/goods/query-attribute-template` | 2026-10-09 11:18:49 |
| [查询关联属性填写规则](/goods/get-associated-attribute-rules) | `POST` | `/open-api/goods/get-associated-attribute-rules` | 2026-04-21 17:39:13 |
| [查询建议零售价审核记录](/goods-recommend-retail-price-audit/search) | `POST` | `/open-api/goods-recommend-retail-price-audit/search` | 2026-07-02 20:33:41 |
| [查询建议零售价填写规则](/goods/query-recommend-retail-price-rule) | `POST` | `/open-api/goods/query-recommend-retail-price-rule` | 2026-09-14 17:12:46 |
| [查询可用品牌列表](/goods/query-brand-list) | `POST` | `/open-api/goods/query-brand-list` | 2026-07-02 21:01:07 |
| [查询可用IP列表](/goods/query-ip-list) | `POST` | `/open-api/goods/query-ip-list` | 2026-07-02 21:01:10 |
| [查询商家发品额度](/goods-publish-quotas/detail) | `POST` | `/open-api/goods-publish-quotas/detail` | 2026-09-04 10:21:42 |
| [查询商家sku是否已存在](/goods/product/check-suppliersku-repeated) | `POST` | `/open-api/goods/product/check-supplierSku-repeated` | 2025-10-22 20:45:14 |
| [查询商品建议零售价](/goods-recommend-retail-price/search) | `POST` | `/open-api/goods-recommend-retail-price/search` | 2026-07-02 20:37:27 |
| [查询商品删除审核记录](/goods-delete-logs/search) | `POST` | `/open-api/goods-delete-logs/search` | 2026-07-03 13:41:30 |
| [查询商品审核状态](/goods/query-document-state) | `POST` | `/open-api/goods/query-document-state` | 2026-11-03 10:21:32 |
| [查询是否可修改销售属性](/goods-specs/check-modify-permission) | `POST` | `/open-api/goods-specs/check-modify-permission` | 2026-10-26 10:36:09 |
| [查询是否支持自定义属性值 ※](/goods/get-custom-attribute-permission-config) | `POST` | `/open-api/goods/get-custom-attribute-permission-config` | 2025-08-15 14:57:20 |
| [查询修改销售属性审核记录](/goods-specs/modify-logs/search) | `POST` | `/open-api/goods-specs/modify-logs/search` | 2026-10-26 11:50:14 |
| [撤回商品审核](/goods/revoke-product) | `POST` | `/open-api/goods/revoke-product` | 2026-07-02 21:00:01 |
| [打印合规标签 ※](/goods-compliance/label-print) | `POST` | `/open-api/goods-compliance/label-print` | 2025-09-05 16:59:54 |
| [店铺查商品末级分类](/goods/query-category-tree) | `POST` | `/open-api/goods/query-category-tree` | 2026-11-03 10:23:49 |
| [更新成本价](/goods/update-cost) | `POST` | `/open-api/goods/update-cost` | 2026-08-03 11:06:53 |
| [获取成本价涨价原因枚举值](/goods/query-change-price-reason) | `POST` | `/open-api/goods/query-change-price-reason` | 2026-07-02 20:27:59 |
| [获取全量环保耗材信息](/goods-quality/environmental-label-rule/material-quality-tree-v2) | `GET` | `/open-api/goods-quality/environmental-label-rule/material-quality-tree-v2` | 2026-07-02 21:02:51 |
| [价格证明材料上传 ※](/goods/discuss/upload-discuss-file) | `POST` | `/open-api/goods/discuss/upload-discuss-file` | 2026-07-02 20:28:04 |
| [确认店铺是否可发品](/goods/product/check-publish-permission) | `GET` | `/open-api/goods/product/check-publish-permission` | 2026-02-06 18:06:06 |
| [确认商品是否可编辑](/goods/product/check-edit-permission) | `POST` | `/open-api/goods/product/check-edit-permission` | 2025-08-28 14:46:52 |
| [商品部分编辑](/goods/product/partialedit) | `POST` | `/open-api/goods/product/partialEdit` | 2026-11-03 10:19:06 |
| [商品发布/编辑](/goods/product/publishoredit) | `POST` | `/open-api/goods/product/publishOrEdit` | 2026-11-03 10:18:28 |
| [商品发布字段规范](/goods/query-publish-fill-in-standard) | `POST` | `/open-api/goods/query-publish-fill-in-standard` | 2026-11-03 10:23:17 |
| [商品列表接口](/openapi-business-backend/product/query) | `POST` | `/open-api/openapi-business-backend/product/query` | 2025-07-17 11:56:50 |
| [商品删除预校验](/goods/check-deletable) | `POST` | `/open-api/goods/check-deletable` | 2026-07-03 13:41:11 |
| [商品综合查询](/goods/searchproduct) | `POST` | `/open-api/goods/searchProduct` | 2026-08-03 10:41:33 |
| [提交建议零售价](/goods-recommend-retail-price/batch-save) | `POST` | `/open-api/goods-recommend-retail-price/batch-save` | 2026-07-02 20:38:59 |
| [提交修改销售属性](/goods-specs/update) | `POST` | `/open-api/goods-specs/update` | 2026-10-26 11:40:42 |
| [图片链接转换](/goods/transform-pic) | `POST` | `/open-api/goods/transform-pic` | 2025-08-12 11:32:52 |
| [图文识别推荐类目](/goods/image-category-suggestion) | `POST` | `/open-api/goods/image-category-suggestion` | 2025-08-12 17:29:45 |
| [sku商品详情查询（即将作废）](/openapi-business-backend/product/full-detail) | `POST` | `/open-api/openapi-business-backend/product/full-detail` | 2025-05-06 16:08:52 |
| [spu商品详情查询](/goods/spu-info) | `POST` | `/open-api/goods/spu-info` | 2026-11-03 10:22:49 |

※ 该接口主归属在其他权限包，此处为共享权限。
