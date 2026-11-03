# 更新SKC的警告语

`POST /open-api/goods-compliance/update-skc-warning-certificate`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2026-06-29 19:41:16 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001858](https://open.sheincorp.com/documents/apidoc/detail/3001858)

## 接口说明

创建/更新某个SKC的警告书证书。详细的入参方式可参考解决方案

## 请求头

- **Content-Type** `string` — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 响应msg的语种。 不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **certificateTypeCode** `string` **必填** — 证书类型编码
- **fieldList** `object[]` **必填** — 证书字段信息
  - **fieldCode** `string` **必填** — 证书字段编码。常规字段和警告语字段都需要入参。具体入参方式请参考解决方案。
  - **fieldValues** `object[]` **必填** — 字段值列表
    - **fieldValueId** `int64` **必填** — 字段值ID 例: `0`
- **skcNames** `string[]` **必填** — SKC平台编码，支持批量操作，单次最多100个。

## 响应参数

- **code** `string` — 响应码 例: `0`
- **msg** `string` — 响应信息 例: `OK`
- **info** `object` **必填** — 详情
  - **successList** `object[]` **必填** — 更新成功列表
    - **skcName** `string` — SKC平台编码 例: `s24102107079376`
  - **failedList** `object[]` **必填** — 更新失败列表
    - **skcName** `string` — SKC平台编码
    - **code** `string` — 失败响应码
    - **reason** `string` — 具体失败原因
- **traceId** `string` — 追踪码 例: `9bc89bf253ca66b0`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-compliance/update-skc-warning-certificate' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1768893109357' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "certificateTypeCode": "PlaypenWMWAttr",
  "fieldList": [
    {
      "fieldCode": "PAWA1",
      "fieldValues": [
        {
          "fieldValueId": 2458
        }    
      ]
    },
    {
      "fieldCode": "WAContent",
      "fieldValues": [
        {
          "fieldValueId": 2457
        },
        {
          "fieldValueId": 2456
        }        
      ]
    } 
  ],
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
    "successList": [
      {
        "skcName": "s24102107079376"
      }
    ],
    "failedList": []
  },
  "bbl": null,
  "traceId": "88770fbb0ca32a25"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001858。