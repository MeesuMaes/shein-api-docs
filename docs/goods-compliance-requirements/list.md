# 查询SKC的合规信息要求

`POST /open-api/goods-compliance-requirements/list`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v2 ｜ **更新时间**：2026-06-29 19:34:41 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001849](https://open.sheincorp.com/documents/apidoc/detail/3001849)

## 接口说明

可查询平台对SKC的合规信息绑定要求（包括资质证书、代理公司、警告语、合规法案、卖点、说明书），出参数据可对应商家后台的商品合规管理列表。
合规信息完整解决方案，详见文档。
【重要说明】
出参中字段complianceGroupCode，可用来区分是哪种类型的合规信息。目前开放平台没有支持所有合规类型信息的创建，不同合规类型的调用接口也不同，请阅读下方枚举说明。
ZSZZL：证书资质类，如各类测试报告，可通过API创建。先查询填写规则/open-api/goods-certificate-schemas/detail，再创建/open-api/goods-certificates/save。
GSL：公司类，如代理公司，可通过API创建。先查询公司列表/open-api/goods-compliance/agency-list，再和SKC绑定/open-api/goods-compliance/save-skc-agency。
HGXXL：合规信息类，如产品标识符、警告语。此类中只有手动绑定的警告语暂可通过API创建，判断方式isManualProductWarning=true，先查询填写规则/open-api/goods-compliance/query-warning-certificate-rules，再编辑SKC的警告语/open-api/goods-compliance/update-skc-warning-certificate。其他信息暂不支持通过API创建。
SPTL：卖点证书，暂不支持通过API创建。
SPSMS：说明书，暂不支持通过API创建。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 响应msg的语种。不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **certificateTypeCodes** `string[]` — 证书类型编码列表，最多20个
- **pageNum** `integer` **必填** — 页码
- **pageSize** `integer` **必填** — 每页大小，最大200
- **reviewStates** `integer[]` — 审核状态。0=未审核（即当前为缺失）;1=待审核;2=审核成功;3=审核驳回
- **skcNames** `string[]` — SKC编码列表，最多200个

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 响应信息
  - **data** `object[]` — 列表
    - **items** `object[]` — 合规要求列表
      - **certificateTypeCode** `string` — 证书类型编码
      - **certificateTypeId** `int64` — 证书类型ID
      - **certificateTypeName** `string` — 证书类型名称
      - **complianceGroupCode** `string` — 合规分组编码。【重要】此编码可用来区分合规信息是什么类型，例如资质证书、代理公司、警告语。目前开放平台接口没有支持所有合规信息的上传，请阅读文档顶部的说明。
      - **isAutoProductWarning** `boolean` — 是否为自动绑定的警告语。 此类警告语不需要商家手动操作，系统会基于设定自动绑定。 例: `false`
      - **isManualProductWarning** `boolean` — 是否为手动绑定的警告语。 此类警告语需要商家手动操作，可通过API创建绑定，接口调用方式详见文档顶部描述。 例: `false`
      - **isRequired** `integer` — 是否必传: 0-否, 1-是, 10-未知（通常是一个瞬时过渡状态）
      - **reviewState** `integer` — 审核状态:0=未审核（即当前为缺失）;1=待审核;2=审核成功;3=审核驳回
    - **skcName** `string` — SKC编码
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-compliance-requirements/list' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1782390739378' \
--header 'language: CN' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
  "pageNum": 1,
  "pageSize": 5,
  "reviewStates": null,
  "skcNames": [
    "test2411208250536034563333"
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
        "skcName": "test2411208250536034563333",
        "items": [
          {
            "certificateTypeCode": "F70B6AFFF3E4087",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "CE-EMC报告",
            "certificateTypeId": 75,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "1241C780AF82D99",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "CE-EMC证书",
            "certificateTypeId": 74,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "2516E51EE95A3F6",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "CE-LVD报告",
            "certificateTypeId": 78,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "968FAA40F10E785",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "CE-LVD证书",
            "certificateTypeId": 77,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 2,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "DD676685837C44F",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "CE符合性声明DoC",
            "certificateTypeId": 311,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "IPcodeTest",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "IP等级测试报告",
            "certificateTypeId": 1198,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "POPsSCCP",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "POPs-SCCP化学测试报告",
            "certificateTypeId": 1197,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "CEPOPs",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "POPs化学测试报告",
            "certificateTypeId": 1196,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "CEPPWR",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "PPWR 包装化学测试报告",
            "certificateTypeId": 1195,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "REACHreport",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "REACH检测报告",
            "certificateTypeId": 1058,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "9D22FF4531F3A2D",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "ROHS-化学报告",
            "certificateTypeId": 29,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "ProductIdenti",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "产品标识符",
            "certificateTypeId": 844,
            "complianceGroupCode": "HGXXL",
            "reviewState": 2,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "EnergyLabel",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "产品欧盟能效注册信息",
            "certificateTypeId": 839,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "SMS310",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "产品说明书（电子电器）",
            "certificateTypeId": 310,
            "complianceGroupCode": "SPSMS",
            "reviewState": 0,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "Manufacturer",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "制造商信息",
            "certificateTypeId": 496,
            "complianceGroupCode": "GSL",
            "reviewState": 2,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "SafetyInformati",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "安全信息",
            "certificateTypeId": 849,
            "complianceGroupCode": "HGXXL",
            "reviewState": 2,
            "isRequired": 0
          },
          {
            "certificateTypeCode": "NXBQ314",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "欧盟能效检测报告",
            "certificateTypeId": 314,
            "complianceGroupCode": "ZSZZL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "EuRespPerson",
            "isManualProductWarning": false,
            "isAutoProductWarning": false,
            "certificateTypeName": "欧盟责任人",
            "certificateTypeId": 456,
            "complianceGroupCode": "GSL",
            "reviewState": 2,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "DJTYAuto",
            "isManualProductWarning": false,
            "isAutoProductWarning": true,
            "certificateTypeName": "灯具通用C端合规警告语",
            "certificateTypeId": 1418,
            "complianceGroupCode": "HGXXL",
            "reviewState": 1,
            "isRequired": 0
          }
        ]
      }
    ],
    "meta": {
      "count": 1,
      "customObj": null
    }
  },
  "bbl": null,
  "traceId": "de7a00bb4186a8fa"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001849。