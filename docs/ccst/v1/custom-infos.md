# 获取定制数据

`GET /open-api/ccst/v1/custom-infos`

**QPS**：50 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v12 ｜ **更新时间**：2026-04-07 21:37:12 ｜ **所属权限包**：[获取定制信息](/packages/customization) ｜ **官方文档**：[3001668](https://open.sheincorp.com/documents/apidoc/detail/3001668)

## 接口说明

使用定制商品id（customInfoId）查询定制数据

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **data** `object`
  - **customInfo** `object` — 定制信息的具体内容
    - **preview** `object`
      - **effects** `string[]` — 预览图（产品形态与用户定制信息结合的图）
      - **images** `string[]` — 图片类型的定制信息
      - **texts** `string[]` — 文字类型的定制信息
    - **stores** `object[]`
      - **id** `string` — 存储项的唯一标识符
      - **key** `string` — 存储项的键
      - **label** `string` — 组件的 label
      - **moduleType** `string` — 模块类型
      - **propertyName** `string` — 属性名称
      - **type** `string` — 数据类型
      - **value** `object` — 存储项的值
    - **customizerId** `string` — 定制搭建的id
    - **customizerVersion** `int64` — 定制搭建的版本
  - **id** `string` — 用户定制信息的唯一标识符

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi-test01.sheincorp.cn/open-api/ccst/v1/custom-infos?customInfoId=58d3dcb1f269463da29dc4a2957cd7a7&lang=zh_CN' \
--header 'x-lt-signature: test0MTQ2NzM3ZDI4ZTJkODU2YzAzMTEyMjc4ZjY3YTFiYzZkZWJiNDk2NGMyOWRhMTNkNzM1YTFjYWU0MGY5YjYxOA==' \
--header 'x-lt-openKeyId: 20553A76716A4299AC612C62FFEDBBF4' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1730379652833' \
--header 'Cookie: gmp_trace=46b216bcb5c344a4858282b25df07984; gsp_trace=7a3f50b4b35b4914b6775c286e10787a; pfmp_trace=0faf1c0b77d549fab42a2243ac81a6c9' \
--data-raw ''
```

### 响应示例

```json
{
  "code": "0",
  "message": "OK",
  "data": {
    "id": "58d3dcb1f269463da29dc4a2957cd7a7",
    "customInfo": {
      "preview": {
        "effects": [
          "https://imgdeal-test01.shein.com/images3_ccc/2024/10/31/d7/17303796092517292289.webp"
        ],
        "images": [
          "https://imgdeal-test01.shein.com/images3_ccc/2024/10/31/17/17303795945296602.webp"
        ],
        "texts": [
          "123113"
        ]
      },
      "stores": [
        {
          "id": "738329",
          "key": "image",
          "label": "2D 预览",
          "moduleType": "preview",
          "propertyName": "2d-preview",
          "type": "image",
          "value": "https://imgdeal-test01.shein.com/images3_ccc/2024/10/31/d7/17303796092517292289.webp"
        },
        {
          "id": "345989",
          "key": "face",
          "label": "图片上传",
          "moduleType": "photo_upload",
          "propertyName": "photo-upload",
          "type": "faceattr[]",
          "value": []
        },
        {
          "id": "345989",
          "key": "source",
          "label": "图片上传",
          "moduleType": "photo_upload",
          "propertyName": "photo-upload",
          "type": "image[]",
          "value": [
            "https://imgdeal-test01.shein.com/images3_ccc/2024/10/31/17/17303795945296602.webp"
          ]
        },
        {
          "id": "345989",
          "key": "value",
          "label": "图片上传",
          "moduleType": "photo_upload",
          "propertyName": "photo-upload",
          "type": "image[]",
          "value": [
            "https://imgdeal-test01.shein.com/images3_ccc/2024/10/31/17/17303795945296602.webp"
          ]
        },
        {
          "id": "749240",
          "key": "value",
          "label": "文本输入框",
          "moduleType": "text",
          "propertyName": "text",
          "type": "string",
          "value": "123113"
        }
      ]
    }
  },
  "traceId": "21538f8b133b7745"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001668。