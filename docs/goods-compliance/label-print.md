# 打印合规标签

`POST /open-api/goods-compliance/label-print`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v21 ｜ **更新时间**：2025-09-05 16:59:54 ｜ **所属权限包**：[商家服务-商品](/packages/merchant-goods)、[商品管理](/packages/goods)、[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001385](https://open.sheincorp.com/documents/apidoc/detail/3001385)

## 接口说明

此接口支持打印商品相关的标签，标签中会包含多种信息，包括：环保标、GPSR、制造商、商品条码。
打印标签前，请先通过接口/open-api/goods-compliance/get-label-template查询每个SKC可用的标签模板，每个模板中包含不同信息，每个信息需提供的入参不同。
不同标签类型的图片示例参考文档。商家后台的标签打印流程可参考文档。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **labelDetailList** `object[]` — 打印规则列表。即提供具体要打印什么内容的标签。单次最多支持10组规则，过多容易响应超时。 打印标签前，请先通过接口/open-api/goods-compliance/get-label-template查询每个SKC可用的标签模板，每个模板中包含不同信息，每个信息需提供的入参不同。
  - **labelType** `integer` **必填** — 标签类型。各类型打印示例查看文档底部FAQ。 1-环保标：通常包含环保信息 2-GPSR标：通常包含GPSR信息（可能也会有环保标、商品条码、制造商信息） 3-商家自定义：包含内容不定，此类标签由商家在后台自行创建。具体包含信息可查询/open-api/goods-compliance/get-label-template。 4-GPSR+环保标：通常包含GPSR、环保信息。 5-商品条码合并标：通常包含商品条码（可能也会有环保标、商品条码、制造商信息）
  - **labelCode** `string` — 打印的标签模板编码。通过/open-api/goods-compliance/get-label-template查询获取 非必填，不传值时系统会根据入参的skc和labelType去匹配出skc可打印的所有标签模板进行打印。
  - **printNumber** `integer` — 标签打印数量。 非必填，只有在入参labelCode的情况下，printNumer才会生效。不传值时默认每个标签打印1份。
  - **packageTypeId** `int64` — 此字段后续会废弃，请改用packageMaterialList入参（支持在一个标签内打印多个环保材料）。
  - **packageMaterialId** `int64` — 此字段后续会废弃，请改用packageMaterialList入参（支持在一个标签内打印多个环保材料）。
  - **packageMaterialList** `object[]` — 环保材料列表。支持一个标签内打印多个环保材料，最多10个材料。 标签内包含环保信息时，需要入参此列表。通常labelType=1/2/4/5时均可入参此信息，但最终打印结果中是否会有环保材料信息，取决于标签模板中是否有环保材料的变量信息。
    - **packageTypeId** `int64` — 环保材料类型ID。可通过接口获取全量环保耗材信息（新）获取。 通常labelType=1/2/4/5时均可入参，但最终打印结果中是否会有环保材料信息，取决于标签模板中是否有环保材料的变量信息。
    - **packageMaterialId** `int64` — 环保材料ID。可通过接口获取全量环保耗材信息（新）获取。 通常labelType=1/2/4/5时均可入参，但最终打印结果中是否会有环保材料信息，取决于标签模板中是否有环保材料的变量信息。
  - **skc** `string` **必填** — 平台生成的SKC唯一编码。 必填，不论什么类型的标签都需要提供。
  - **skuCode** `string` — 商品条码中显示的sku。标签内包含条码信息时，skucode和suppliersku选择一个入参即可， 通常labelType=2/4/5时均可入参，但最终打印结果中是否会有商品条码信息，取决于标签模板中是否有商品条码的变量信息。
  - **supplierSku** `string` — 商品条码中显示的sku。标签内包含条码信息时，skucode和suppliersku选择一个入参即可， 通常labelType=2/4/5时均可入参，但最终打印结果中是否会有商品条码信息，取决于标签模板中是否有商品条码的变量信息。
  - **orderNo** `string` — 商品条码中显示的采购单号。标签内包含条码信息时使用，非必填，不传值则单号位置显示空。 通常labelType=2/4/5时均可入参，但最终打印结果中是否会有商品条码信息，取决于标签模板中是否有商品条码的变量信息。
  - **originCountry** `string` — 原产地。标签内包含GPSR信息时使用，由商家自定义输入值，填写国家名称。 通常labelType=2/4/5是均可入参。
  - **productBatchNo** `string` — 产品批次号。标签内包含GPSR信息时使用，由商家自定义输入值。 通常labelType=2/4/5是均可入参。
  - **warning** `string` — 警示语。标签内包含GPSR信息时使用，由商家自定义输入值。 通常labelType=2/4/5是均可入参。
  - **uid** `string` **必填** — 打印规则的定位ID。每一行的定位ID不可重复。由开发者自定义输入，用于在返回中判断哪条规则打印失败，哪条打印成功。

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object` — 打印结果列表
  - **failedList** `object[]` — 失败列表
    - **code** `string[]` — 失败code
    - **labelType** `integer` — 标签类型
    - **reason** `string[]` — 失败原因
    - **uid** `string` — 失败行的定位ID。 一组打印规则可能匹配出多个标签，因此返回结果中会有多行相同UID出现。
  - **successList** `object[]` — 成功列表
    - **labelLength** `integer` — 标签尺寸-长
    - **labelType** `integer` — 标签类型
    - **labelUrl** `string` — 标签PDF URL。 当入参中包含labelCode和printNumber（且大于1）时，URL中会包含多个内容一样的标签内容。
    - **labelWidth** `integer` — 标签尺寸-宽
    - **labelCode** `string` — 标签模板code
    - **uid** `string` — 成功行的定位ID。 一组打印规则可能匹配出多个标签，因此返回结果中会有多行相同UID出现。
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-compliance/label-print' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1755507118894' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "labelDetailList":[
        {
        "labelCode":"1752493613919",
        "labelType":1,
        "skc":"sa25080185896920018",
        "productBatchNo":"123",
        "originCountry":"china",
        "warning":"warning test",
        "packageMaterialList":[
            {
                "package_material_id":191,
                "package_type_id":113
            },
            {
                "package_material_id":408,
                "package_type_id":113
            }
        ],
        "printNumber":2,
        "skuCode":"I9pfmig3wu1d",
        "uid":1},

        {"labelType":4,
        "productBatchNo":"123",
        "originCountry":"china",
        "warning":"warning test",
        "skc":"sa25080185896920018",
        "packageMaterialList":[
            {
                "packageMaterialId":191,
                "packageTypeId":113
            },
            {
                "packageMaterialId":408,
                "packageTypeId":113
            }
        ],
        "uid":2},
        {
        "labelCode":"1754474187729",
        "labelType":5,
        "printNumber":2,
        "skuCode":"I9pfmig3wu1d",
        "uid":3
        }
    ]

}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "successList": [
      {
        "uid": "1",
        "labelType": 1,
        "labelUrl": "https://ssmp-public-test-ali.oss-cn-shenzhen.aliyuncs.com/pdf2-test/pcrs/2025/8/18/1755507126981-5f362dde5df7dc267d95b9f7988a476f.oss.pdf?AWSAccessKeyId=LTAI5tRyBdX9kWZcVCLyWMTF&Expires=1756111930&Signature=<REDACTED>",
        "labelCode": "1752493613919",
        "labelWidth": 110,
        "labelLength": 100
      },
      {
        "uid": "2",
        "labelType": 4,
        "labelUrl": "https://ssmp-public-test-ali.oss-cn-shenzhen.aliyuncs.com/pdf2-test/pcrs/2025/8/18/1755507126976-6cfdb1f258b4027043610479c465e332.oss.pdf?AWSAccessKeyId=LTAI5tRyBdX9kWZcVCLyWMTF&Expires=1756111928&Signature=<REDACTED>",
        "labelCode": "1750405331884",
        "labelWidth": 120,
        "labelLength": 80
      },
      {
        "uid": "2",
        "labelType": 4,
        "labelUrl": "https://ssmp-public-test-ali.oss-cn-shenzhen.aliyuncs.com/pdf2-test/pcrs/2025/8/18/1755507126970-bcd255cbffdc685fbc7aaa69aebc2797.oss.pdf?AWSAccessKeyId=LTAI5tRyBdX9kWZcVCLyWMTF&Expires=1756111928&Signature=<REDACTED>",
        "labelCode": "1747028949999",
        "labelWidth": 60,
        "labelLength": 80
      },
      {
        "uid": "3",
        "labelType": 5,
        "labelUrl": "https://ssmp-public-test-ali.oss-cn-shenzhen.aliyuncs.com/pdf2-test/pcrs/2025/8/18/1755507127002-38481feca56aac488ab0e36758ed3e56.oss.pdf?AWSAccessKeyId=LTAI5tRyBdX9kWZcVCLyWMTF&Expires=1756111930&Signature=<REDACTED>",
        "labelCode": "1754474187729",
        "labelWidth": 60,
        "labelLength": 80
      }
    ],
    "failedList": []
  },
  "bbl": null,
  "traceId": "9e6264bb12fac88d"
}
```

&lt;/details>

## 其他场景示例

### 通过SKC去匹配可用标签

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "successList": [
      {
        "uid": "1",
        "labelType": 4,
        "labelUrl": "https://ssmp-public-test-ali.oss-cn-shenzhen.aliyuncs.com/pdf2-test/pcrs/2025/9/5/1757062284303-16beefc0971efed69ada7d845409ec26.oss.pdf?AWSAccessKeyId=LTAI5tRyBdX9kWZcVCLyWMTF&Expires=1757667086&Signature=<REDACTED>",
        "labelCode": "1750405331884",
        "labelWidth": 120,
        "labelLength": 80
      },
      {
        "uid": "1",
        "labelType": 4,
        "labelUrl": "https://ssmp-public-test-ali.oss-cn-shenzhen.aliyuncs.com/pdf2-test/pcrs/2025/9/5/1757062284199-efefe199535aad8bfba9bca9dcdb152c.oss.pdf?AWSAccessKeyId=LTAI5tRyBdX9kWZcVCLyWMTF&Expires=1757667086&Signature=<REDACTED>",
        "labelCode": "1747028949999",
        "labelWidth": 60,
        "labelLength": 80
      }
    ],
    "failedList": []
  },
  "bbl": null,
  "traceId": "dfbbec9dd1798897"
}
```

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001385。