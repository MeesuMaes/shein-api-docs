# 创建/编辑资质证书

`POST /open-api/goods-certificates/save`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2026-07-03 14:28:29 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001908](https://open.sheincorp.com/documents/apidoc/detail/3001908)

## 接口说明

可创建和编辑资质证书。操作前请先查询证书的填写规则（/open-api/goods-certificate-schemas/detail），基于规则再操作。
完整的资质证书接口调用方案，详见文档。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 响应msg的语种。不传时默认为中文，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **certificateDimension** `integer` — 证书适用范围：1-部分商品（即需要手动绑定至商品），2-全部商品（即自动和所有商品绑定）。 创建时必填。
- **certificateTypeCode** `string` — 证书类型编码。创建时必填，可通过/open-api/goods-compliance-requirements/list获取。
- **fileList** `object[]` — 证书文件列表。 所有文件必须转换为SHEIN链接后上传，不支持使用外部url。上传接口：/open-api/goods-certificate-files/upload
  - **fileMd5** `string` **必填** — 文件MD5。通过上传接口获取：/open-api/goods-certificate-files/upload
  - **fileName** `string` **必填** — 文件名称。ERP自定义名称。
  - **fileUrl** `string` **必填** — 文件URL。通过上传接口获取：/open-api/goods-certificate-files/upload
- **poolSn** `string` — 证书编号。创建时不用填写，编辑时必须填写。
- **presetInfoList** `object[]` — 证书字段列表
  - **presetId** `int64` **必填** — 字段id。通过/open-api/goods-certificate-schemas/detail中获取。otherPresetInfoList和presetInfoList中的presetId都往此字段中传。
  - **valueList** `object[]` **必填** — 字段值列表。
    - **value** `string` — 字段值（手动输入值） 1、presetInfoList下字段，当inputType=3/4时，输入手动输入值。 2、otherPresetInfoList下字段，有两种情况： 2.1 sourceFrom=SRM，需输入实验室id（srmDetectionAgencyList-laboratoryId。实验室和valueId的机构在同组数据内） 2.2 sourceFrom≠SRM，需输入字段自己的value值（otherPresetInfoList - presetValueList-presetValue）
    - **valueId** `int64` — 字段值（填写id） 1、presetInfoList下字段，当inputType=1/2时，录入id（presetInfoList-presetValueList-presetValueId） 2、otherPresetInfoList下字段，有两种情况： 2.1 sourceFrom=SRM，需输入机构id（srmDetectionAgencyList-detectionAgencyId。机构需和value的实验室在同组数据内） 2.2 sourceFrom≠SRM，输入字段自己的valueId（otherPresetInfoList-presetValueList-presetValueId）

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 响应
  - **code** `string` — 操作结果码：0-成功，非0-失败
  - **existPoolSnList** `string[]` — 已存在的重复证书编号列表（文件内容重复时返回）
  - **failMsg** `string` — 失败提示消息
  - **poolSn** `string` — 证书编号
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-certificates/save' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1782700168700' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
  "certificateDimension": 1,
  "certificateTypeCode": "3DD70084B6997DF",
  "fileList": [
    {
      "fileMd5": "2230eacf3617c2a4604758ea3ae871b9",
      "fileName": "test",
      "fileUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/erp3430849440189104128.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260624T120242Z&X-Amz-SignedHeaders=host&X-Amz-Expires=432000&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>"
    }
  ],
  "poolSn": "",
  "presetInfoList": [
    {
      "presetId": 175,
      "valueList": [
        {
          "value": "2027-01-01 00:00:00"
        }
      ]
    },
  {
      "presetId": 183,
      "valueList": [
        {
          "valueId": 16886285,
          "value":16997191
        }
      ]
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
    "poolSn": "ocp3437520192426127360",
    "code": "0",
    "failMsg": null,
    "existPoolSnList": null
  },
  "bbl": null,
  "traceId": "f6c96760e4b4df7e"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001908。