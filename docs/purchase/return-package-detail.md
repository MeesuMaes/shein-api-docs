# 查询退货与报废单包裹明细

`POST /open-api/purchase/return-package-detail`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-06-04 13:50:23 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001779](https://open.sheincorp.com/documents/apidoc/detail/3001779)

## 接口说明

查询退货单对应的包裹打包明细信息

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **page** `integer` — 页码，不传默认1 例: `17`
- **pageSize** `integer` — 分页大小，1-100，不传默认20 例: `89`
- **returnOrderNo** `string` — 查询的退货单号 例: `random_returnOrderNo`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪
- **info** `object`
  - **data** `object[]`
    - **boxList** `object[]` — 包裹明细
      - **goods** `object[]` — 商品明细
        - **details** `object[]` — 商品明细(按sku)
          - **platformSku** `string` — 平台SKU 例: `random_platformSku`
          - **returnQuantity** `integer` — 执行退货数量 例: `0`
          - **suffixZh** `string` — SKU属性集-销售属性拼接 例: `random_suffixZh`
          - **supplierSku** `string` — 商家SKU 例: `random_supplierSku`
        - **imgPath** `string` — 主图 例: `random_imgPath`
        - **skc** `string` — SKC 例: `random_skc`
        - **skcCopyFlag** `integer` — 是否专供SHEIN：1-是，2-否 例: `19`
        - **supplierCode** `string` — 货号 例: `random_supplierCode`
      - **packageName** `string` — 包裹名 例: `random_packageName`
      - **returnBoxNo** `string` — 出库箱号 例: `random_returnBoxNo`
    - **deliveryTime** `string` — 退货发出时间 例: `2026-05-29T08:47:36.485Z`
    - **expressCode** `string` — 运单号 例: `random_expressCode`
    - **expressCompanyCode** `string` — 物流公司编码 例: `random_expressCompanyCode`
    - **expressCompanyName** `string` — 物流公司名称 例: `random_expressCompanyName`
    - **selfPickStartTime** `string` — 自提开始时间 例: `2026-05-29T08:47:36.485Z`
    - **supplierCategoryTypeFlag** `boolean` — 商家一级分类标志,一级分类=BRAND自营、US-SPP、美国SFS、巴西SFS等取值为true 例: `false`
  - **meta** `object`
    - **count** `integer` 例: `41`
    - **customObj** `object`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/purchase/return-package-detail' \
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
        "expressCode": "SF0000021102501",
        "expressCompanyCode": "",
        "expressCompanyName": "",
        "deliveryTime": "2025-04-30 14:48:21",
        "selfPickStartTime": "2026-01-01 14:47:34",
        "supplierCategoryTypeFlag": false,
        "boxList": [
          {
            "packageName": "包裹1",
            "returnBoxNo": "ZZBFH261210000029-01",
            "goods": [
              {
                "imgPath": "http://imgdeal-test01.shein.com/images3_pi/2023/11/07/a9/16993415152939413749.jpg",
                "skc": "ss21101356992632",
                "skcCopyFlag": 2,
                "supplierCode": "1232",
                "details": [
                  {
                    "platformSku": "I71jhxynch7w",
                    "supplierSku": "T-113",
                    "suffixZh": "焦糖色-S",
                    "returnQuantity": 1
                  },
                  {
                    "platformSku": "I23a7r204688",
                    "supplierSku": "",
                    "suffixZh": "焦糖色-L(中文)",
                    "returnQuantity": 1
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "expressCode": "SF0000021102502",
        "expressCompanyCode": "",
        "expressCompanyName": "",
        "deliveryTime": null,
        "selfPickStartTime": "2026-01-10 17:20:17",
        "supplierCategoryTypeFlag": false,
        "boxList": [
          {
            "packageName": "包裹2",
            "returnBoxNo": "ZZBFH261210000029-02",
            "goods": [
              {
                "imgPath": "http://imgdeal-test01.shein.com/images3_pi/2023/11/07/a9/16993415152939413749.jpg",
                "skc": "ss21101356992632",
                "skcCopyFlag": 2,
                "supplierCode": "1232",
                "details": [
                  {
                    "platformSku": "I71jhxynch7w",
                    "supplierSku": "T-113",
                    "suffixZh": "焦糖色-S",
                    "returnQuantity": 1
                  },
                  {
                    "platformSku": "I23a7r204688",
                    "supplierSku": "",
                    "suffixZh": "焦糖色-L(中文)",
                    "returnQuantity": 1
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "expressCode": "SF0000021102503",
        "expressCompanyCode": "",
        "expressCompanyName": "",
        "deliveryTime": null,
        "selfPickStartTime": "2026-01-03 14:47:59",
        "supplierCategoryTypeFlag": false,
        "boxList": [
          {
            "packageName": "包裹3",
            "returnBoxNo": "ZZBFH261210000029-03",
            "goods": [
              {
                "imgPath": "http://imgdeal-test01.shein.com/images3_pi/2023/11/07/a9/16993415152939413749.jpg",
                "skc": "ss21101356992632",
                "skcCopyFlag": 2,
                "supplierCode": "1232",
                "details": [
                  {
                    "platformSku": "I71jhxynch7w",
                    "supplierSku": "T-113",
                    "suffixZh": "焦糖色-S",
                    "returnQuantity": 1
                  },
                  {
                    "platformSku": "I23a7r204688",
                    "supplierSku": "",
                    "suffixZh": "焦糖色-L(中文)",
                    "returnQuantity": 1
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "meta": {
      "count": 3,
      "customObj": {}
    }
  },
  "bbl": {},
  "traceId": "19808d733b0163e0"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001779。