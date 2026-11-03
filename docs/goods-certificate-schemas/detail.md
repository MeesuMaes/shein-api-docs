# 查询资质证书填写规则

`POST /open-api/goods-certificate-schemas/detail`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v4 ｜ **更新时间**：2026-09-22 17:47:57 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3002037](https://open.sheincorp.com/documents/apidoc/detail/3002037)

## 接口说明

获取资质证书的填写规则，仅支持获取complianceGroupCode=ZSZZL的规则，其他合规信息的填写规则请通过其他接口获取。
完整的资质证书接口调用方案，详见文档

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 响应msg的语种。不传时默认为中文，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **certificateTypeCodes** `string[]` — 证书类型code，单次最多查询10个。
- **certificateTypeIdList** `int64[]` — 证书类型id,批量查询数量最多:1000

## 响应参数

- **code** `string` **必填** — 响应编码成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 响应信息
  - **certificateTypeInfoList** `object[]` — 证书类型信息列表
    - **certificateDimension** `integer` — 证书绑定维度：1:部分商品（需手动和SKC绑定）；2:全部商品
    - **certificateLabel** `string` — 证书类型标识：0普通类型；1自符类型；2-溯源证书。 目前API仅支持0普通类型的资质证书创建。
    - **certificateType** `string` — 证书类型值描述
    - **certificateTypeId** `int64` — 证书类型id
    - **certificateTypeCode** `string` — 证书类型code
    - **complianceGroupCode** `string` — 合规信息分组code。枚举值：HGXXL-合规信息类；SPTL-卖点类；GSL-公司类；ZSZZL-证书资质类；SPSMS-说明书 【重要】此接口只能获取ZSZZL的填写规则，其他分组的填写规则需要通过其他接口获取。
    - **fileModelUrl** `string` — 证书下载模板链接
    - **isEnabled** `integer` — 规则状态（0:不启用,1:启用)
    - **otherPresetInfoList** `object[]` — 证书字段（外部关联字段，例如检测机构等。字段的的可选value通常需要srmDetectionAgencyList获取。）
      - **inputType** `integer` — 外部关联字段录入方式(1:单选,2:多选,3:手动录入,4:日期格式,5:警告语,6:欧盟责任人)
      - **isRequired** `integer` — 外部维护时是否必填(0:否,1:是)
      - **presetId** `int64` — 外部关联字段id
      - **presetName** `string` — 外部关联字段名CODE
      - **presetRemark** `string` — 外部关联字段名描述
      - **presetValueList** `object[]` — 外部关联字段值信息
        - **presetValue** `string` — 关联字段的值描述
        - **presetValueId** `int64` — 关联字段的值ID
      - **sourceFrom** `string` — 外部关联字段来源
      - **unit** `string` — 外部关联字段单位
    - **presetInfoList** `object[]` — 证书关联字段信息
      - **inputType** `integer` — 关联字段录入方式(1:单选,2:多选,3:手动录入,4:日期格式,5:警告语,6:欧盟责任人)
      - **isRequired** `integer` — 维护时是否必填(0:否,1:是)
      - **presetId** `int64` — 关联字段id
      - **presetName** `string` — 关联字段名CODE
      - **presetRemark** `string` — 关联字段名描述
      - **presetValueList** `object[]` — 关联字段值信息
        - **presetValue** `string` — 关联字段的值描述
        - **presetValueId** `int64` — 关联字段的值ID
      - **unit** `string` — 关联字段单位
  - **srmDetectionAgencyList** `object[]` — SRM检测机构列表
    - **detectionAgency** `object`
      - **detectionAgencyId** `int64` — 检测机构id
      - **detectionAgencyName** `string` — 检测机构名称
    - **laboratoryList** `object[]` — 实验室列表
      - **laboratoryId** `int64` — 实验室id
      - **laboratoryName** `string` — 实验室名称
- **traceId** `string`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-certificate-schemas/detail' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1782822499186' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
  "certificateTypeCodes":["968FAA40F10E785"]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "certificateTypeInfoList": [
      {
        "certificateTypeId": 77,
        "certificateLabel": 0,
        "certificateType": "CE-LVD证书",
        "certificateDimension": 1,
        "fileModelUrl": "https://lt-pqms.oss-cn-shenzhen.aliyuncs.com/17060023392868330111.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260630T122821Z&X-Amz-SignedHeaders=host&X-Amz-Expires=432000&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>",
        "isEnabled": 1,
        "complianceGroupCode": "ZSZZL",
        "presetInfoList": [
          {
            "presetId": 175,
            "presetName": "certificate_effective_time",
            "presetRemark": "证书生效时间",
            "inputType": 4,
            "unit": "",
            "isRequired": 1,
            "presetValueList": []
          }
        ],
        "otherPresetInfoList": []
      }
    ],
    "srmDetectionAgencyList": [
      {
        "detectionAgency": {
          "detectionAgencyId": 16886285,
          "detectionAgencyName": "UTS中联品检"
        },
        "laboratoryList": [
          {
            "laboratoryId": 16997191,
            "laboratoryName": "UTS-佛山-纺织品"
          }
        ]
      },
      {
        "detectionAgency": {
          "detectionAgencyId": 16544234,
          "detectionAgencyName": "TUV Rheinland CCIC(Qingdao) Co., Ltd., CPSC ID 1641"
        },
        "laboratoryList": [
          {
            "laboratoryId": 16544235,
            "laboratoryName": "TUVR莱茵-青岛-纺织-1641"
          }
        ]
      },
      {
        "detectionAgency": {
          "detectionAgencyId": 16541449,
          "detectionAgencyName": "Guangdong Wonder Testing International Co., Ltd."
        },
        "laboratoryList": [
          {
            "laboratoryId": 16702039,
            "laboratoryName": "Guangdong Wonder Testing International Co., Ltd.+guandong+TOY+1435"
          }
        ]
      },
      {
        "detectionAgency": {
          "detectionAgencyId": 16445263,
          "detectionAgencyName": "QIMA (Hangzhou) Testing Co., Ltd"
        },
        "laboratoryList": [
          {
            "laboratoryId": 16445264,
            "laboratoryName": "启迈（杭州）检测有限公司"
          }
        ]
      },
      {
        "detectionAgency": {
          "detectionAgencyId": 16396873,
          "detectionAgencyName": "Shenzhen Ensure Quality Technology Service Co.,Ltd."
        },
        "laboratoryList": [
          {
            "laboratoryId": 16396874,
            "laboratoryName": "深圳确保质量技术服务有限公司"
          }
        ]
      }
    ]
  },
  "bbl": null,
  "traceId": "fca3ac4f6fa8408a"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002037。