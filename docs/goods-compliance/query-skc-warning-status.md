# 查询SKC的警告语绑定状态

`POST /open-api/goods-compliance/query-skc-warning-status`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2026-06-29 19:38:47 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001856](https://open.sheincorp.com/documents/apidoc/detail/3001856)

## 接口说明

查询SKC的警告语证书绑定要求和状态，（此接口已有新接口承接，建议优先对接新接口：/open-api/goods-compliance-requirements/list）。
警告语接口完整调用方案，详见文档。

## 请求头

- **Content-Type** `string` — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 响应msg的语种。 不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **certificateTypeCodes** `string[]` **必填** — 证书类型编码列表，最多20个（目前警告语证书少于20个）。 建议先查询/open-api/goods-compliance/query-warning-certificate-rules，获取到全量的警告语证书code，将他们入参至此以确保查出的结果全是警告语的绑定数据。目前平台没有警告语证书标识，只能通过具体的certificateTypeCode来识别哪些是警告语。
- **pageNum** `integer` **必填** — 页数 例: `0`
- **pageSize** `integer` **必填** — 每页数量，最多200个 例: `0`
- **reviewStates** `integer[]` — 审核状态。0=没有提交过审核;1=待审核;2=审核成功;3=审核驳回 例: `0`
- **skcNames** `string[]` — SKC平台编码，最多200个

## 响应参数

- **code** `string` — 响应码 例: `0`
- **msg** `string` — 响应信息 例: `OK`
- **info** `object` — 详情
  - **data** `object[]` — 详情
    - **skcName** `string` — SKC平台编码 例: `s24102107079376`
    - **items** `object[]` — SKC需要绑定的警告语证书
      - **certificateTypeCode** `string` — 证书类型Code 例: `EuToyWarnings`
      - **certificateTypeName** `string` — 证书类型名称 例: `EU Toy Safety Directive`
      - **certificateTypeId** `integer` — 证书类型ID 例: `396`
      - **complianceGroupCode** `string` — 证书所属场景，对ERP无业务意义 例: `HGXXL`
      - **reviewState** `integer` — 审核状态。0=没有提交过审核;1=待审核;2=审核成功;3=审核驳回 例: `0`
      - **isRequired** `integer` — 是否必传。0-否, 1-是。 例: `1`
  - **meta** `object` — 计数数据
    - **count** `integer` — SKC条数 例: `1`
    - **customObj** `json`
- **bbl** `json`
- **traceId** `string` — 追踪码 例: `35a2233c5d654010`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-compliance/query-skc-warning-status' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1768984801196' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "certificateTypeCodes": [
  "PlaypenWMWAttr",
  "PWarningAttr",
  "111111",
  "BallWarnings",
  "FPWarningAttr",
  "Tem1",
  "SWarningAttr",
  "BCSWarningAttr",
  "EuToyWarnings",
  "cathymuban1",
  "ToyWarningWord",
  "WSWarningAttr",
  "BabyBathPWAttr",
  "InfanBedWMWAttr",
  "BabyRockerWAttr",
  "FCWarningAttr",
  "HCWarningAttr"
]
,
  "pageNum": 1,
  "pageSize": 10,
  "reviewStates": null,
  "skcNames": [
    "s24102107079376"
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
        "skcName": "s24102107079376",
        "items": [
          {
            "certificateTypeCode": "WSWarningAttr",
            "certificateTypeName": "婴儿安全门栏警告语-属性",
            "certificateTypeId": 677,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "FCWarningAttr",
            "certificateTypeName": "婴儿背带警告语-属性",
            "certificateTypeId": 667,
            "complianceGroupCode": "HGXXL",
            "reviewState": 1,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "SWarningAttr",
            "certificateTypeName": "婴儿车警告语-属性",
            "certificateTypeId": 671,
            "complianceGroupCode": "HGXXL",
            "reviewState": 1,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "PWarningAttr",
            "certificateTypeName": "安抚奶嘴及配件警告语-属性",
            "certificateTypeId": 666,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "EuToyWarnings",
            "certificateTypeName": "欧盟玩具安全指令",
            "certificateTypeId": 396,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "FPWarningAttr",
            "certificateTypeName": "母婴喂养用品警告语-属性",
            "certificateTypeId": 665,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "BallWarnings",
            "certificateTypeName": "气球警告语",
            "certificateTypeId": 537,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "ToyWarningWord",
            "certificateTypeName": "玩具窒息危险警告语",
            "certificateTypeId": 340,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "BCSWarningAttr",
            "certificateTypeName": "自行车儿童座椅警告语-属性",
            "certificateTypeId": 675,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
          },
          {
            "certificateTypeCode": "HCWarningAttr",
            "certificateTypeName": "高脚椅警告语-属性",
            "certificateTypeId": 669,
            "complianceGroupCode": "HGXXL",
            "reviewState": 0,
            "isRequired": 1
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
  "traceId": "f436fe15a8c3aa20"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001856。