# 查询资质证书列表

`POST /open-api/goods-certificates/search`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2026-07-03 14:20:15 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001907](https://open.sheincorp.com/documents/apidoc/detail/3001907)

## 接口说明

获取店铺内已经创建好的资质证书列表（对应商家后台-合规-商品合规管理-证书库tab列表）。
完整的资质证书场景接口调用方式，详见文档

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 响应msg的语种。不传时默认为中文，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **certificateTypeCodeList** `string[]` — 证书类型编码列表，单次最多查询10个。
- **fileName** `string` — 证书文件名称（即证书中图片或pdf文件的名称），模糊查询
- **pageNum** `integer` **必填** — 页码，从1开始
- **pageSize** `integer` **必填** — 每页大小，最大100。
- **poolSnList** `string[]` — 证书编号列表（即平台对每份证书的唯一编码）
- **statusList** `integer[]` — 证书状态列表：1-待生效，2-已生效，3-已失效，4-待填写，5-即将失效，6-草稿。

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 响应信息
  - **data** `object[]` — 列表数据
    - **alertTime** `datetime` — 证书预警日期
    - **bindSkcFlag** `integer` — 是否已绑定SKC：1-是，0-否
    - **certificateDimension** `integer` — 适用范围维度：1-部分商品，2-全部商品
    - **certificateTypeCode** `string` — 证书类型编码
    - **certificateTypeId** `int64` — 证书类型ID
    - **certificateTypeName** `string` — 证书类型名称
    - **effectiveTime** `datetime` — 证书生效日期
    - **fileList** `object[]` — 证书中包含的文件列表
      - **fileGroup** `integer` — 文件分组：0-默认值，1-本体，2-包装，41-PDF简版文件，42-PDF完整版文件。
      - **fileMd5** `string` — 文件MD5
      - **fileName** `string` — 文件名称
      - **fileUrl** `string` — 文件URL
      - **insertTime** `datetime` — 新增时间
      - **langs** `string[]` — 文件语种列表
    - **insertTime** `datetime` — 记录插入时间
    - **invalidTime** `datetime` — 证书失效日期
    - **lastUpdateTime** `datetime` — 证书信息更新时间
    - **poolId** `int64` — 证书ID。此字段使用场景较少，更多使用的是poolSn。
    - **poolSn** `string` — 证书编号。更多接口里使用的证书唯一编码是这个字段。
    - **presetInfoList** `object[]` — 证书中的字段信息列表。
      - **presetId** `int64` — 字段ID
      - **valueList** `object[]` — 字段值列表
        - **value** `string` — 字段值。覆盖两种情况。 1、检验机构字段（归属于otherPresetInfoList且sourceFrom=SRM），此处是实验室id（srmDetectionAgencyList-laboratoryId） 2、非检测结构字段（归属于presetInfoList，inputType=3/4，如生效时间），此处是手动输入值
        - **valueId** `int64` — 字段值ID。覆盖两种情况。 1、检验机构字段（归属于otherPresetInfoList且sourceFrom=SRM），此处是检测结构id（srmDetectionAgencyList-detectionAgencyId） 2、非检测结构的字段（归属于presetInfoList，inputType=1/2），此处是所选id（presetInfoList-presetValueList-presetValueId）
    - **status** `integer` — 证书状态：1-待生效，2-已生效，3-已失效，4-待填写，5-即将失效，6-草稿
    - **supplierId** `int64` — 商家ID
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-certificates/search' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1782700321104' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
  "pageNum": 1,
  "pageSize": 10,
  "certificateTypeCodeList":["3DD70084B6997DF"]
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
        "poolId": 11482836,
        "poolSn": "ocp3437520192426127360",
        "supplierId": 5416450,
        "certificateTypeId": 7,
        "certificateTypeCode": "3DD70084B6997DF",
        "certificateTypeName": "RSL Chemical Test Report",
        "status": 1,
        "certificateDimension": 1,
        "effectiveTime": "2027-01-01 00:00:00",
        "invalidTime": "2031-12-31 00:00:00",
        "alertTime": "2031-12-01 00:00:00",
        "bindSkcFlag": 0,
        "insertTime": "2026-06-29 10:29:30",
        "lastUpdateTime": "2026-06-29 10:29:30",
        "fileList": [
          {
            "fileName": "test",
            "fileUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/erp3430849440189104128.jpeg",
            "fileMd5": "2230eacf3617c2a4604758ea3ae871b9",
            "fileGroup": 0,
            "langs": [
              "en"
            ],
            "insertTime": "2026-06-29 10:29:30"
          }
        ],
        "presetInfoList": [
          {
            "presetId": 175,
            "valueList": [
              {
                "valueId": null,
                "value": "2027-01-01 00:00:00"
              }
            ]
          },
          {
            "presetId": 183,
            "valueList": [
              {
                "valueId": 16886285,
                "value": "16997191"
              }
            ]
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
  "traceId": "1e51dfd2935e20b1"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001907。