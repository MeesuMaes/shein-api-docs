# 查询商品证书要求和审核状态

`POST /open-api/goods/get-certificate-rule`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v12 ｜ **更新时间**：2026-06-29 19:52:41 ｜ **所属权限包**：[上传商品证书](/packages/product-certificate) ｜ **官方文档**：[3001859](https://open.sheincorp.com/documents/apidoc/detail/3001859)

## 接口说明

该API支持查询证书要求及证书信息。
2026年7月开放平台已推出资质证书新接口，建议对接新接口，详细方案请参考文档。

## 请求头

- **language** `string` **必填** — language
- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **attributeList** `object[]` — 属性数组
  - **attributeId** `int64` — 商品的普通属性id，对接店铺可用属性接口中attribute_type=4的属性
  - **attributeValueId** `int64` — 商品的普通属性值id；商品的普通属性id，对接店铺可用属性接口中attribute_type=4的属性值
- **categoryId** `int64` — 商品的末级分类id
- **certificatePoolId** `int64[]` — 证书池ID；通过创建证书池获取，可用于查询证书池当前的审核状态
- **siteArrList** `string[]` — 商品销售的站点信息
- **spuName** `string` — SHEIN平台生成的SPU，对应商品发布的spu_name；建议用spu查询商品所需证书以及证书的审核状态
- **systemId** `string` — 来源系统:固定传spmp

## 响应参数

- **bbl** `object` — 响应异常时的bbl相关信息
  - **info** `object`
    - ***** `object[]`
      - **key** `string`
      - **npid** `string`
      - **tag** `string`
      - **value** `string`
  - **npid** `string`
- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **data** `object[]` — 结果
    - **certificateDimension** `integer` — 判断证书是否需要绑定商品；1、商品维度的证书，该类型的证书需要绑定skc；2、店铺维度的证书，该类型的证书上传后，不需要绑定skc商品
    - **certificateLabel** `string` — 字符标识： 0普通类型；1字符类型
    - **certificateMissStatus** `boolean` — 证书类型缺失状态 (true: 证书缺失 false：证书不缺) 例: `0`
    - **certificatePoolList** `object[]` — 证书信息集合
      - **auditStatus** `string` — 审核状态 1 待审核、2 审批成功、3 审批失败
      - **certificateExpireStatus** `string` — 证书过期状态：1：正常(未过期)， 2：证书即将过期 3：过期
      - **certificatePoolFileList** `object[]` — 证书文件集合
        - **certificateUrl** `string` — 证书url地址
        - **certificateUrlName** `string` — 证书url名称
      - **certificatePoolId** `int64` — 证书池id
      - **expireTime** `datetime` — 证书过期时间 (即有效期) 如果是 1970-01-01 00:00:00 则永不过期
      - **pqmsCertificateSn** `string` — 证书编号sn
    - **certificateTypeId** `int64` — 证书类型ID
    - **certificateTypeValue** `string` — 证书类型名称
    - **fileModelUrl** `string` — CPC证书下载模板链接
    - **isRequired** `boolean` — 是否必须要有证书 true：必有 false：非必有 例: `0`
    - **mergeSiteInfoList** `object[]` — 管控的站点信息集合
      - **mergeSiteName** `string` — 管控的区域名称
      - **subSiteList** `string[]` — 管控的子站集合信息
    - **otherSourceCertInfoList** `object[]` — 其他系统来源证书集合
      - **auditStatus** `string` — 审核状态 1 待审核、2 审批成功、3 审批失败
      - **certificateExpireStatus** `string` — 证书过期状态：0：正常(未过期)， 1：证书即将过期 2：过期
      - **certificatePoolFileList** `object[]` — 证书文件集合
        - **certificateUrl** `string` — 证书url地址
        - **certificateUrlName** `string` — 证书url名称
      - **expireTime** `datetime` — 证书过期时间 (即有效期) 如果是 1970-01-01 00:00:00 则永不过期
      - **pqmsCertificateSn** `string` — 证书编号sn
      - **systemSource** `string` — 来源系统
    - **selfCertificateList** `object[]` — 字符声明类型下的普通证书类型信息
      - **certificateTypeId** `int64` — 证书类型id
      - **certificateTypeName** `string` — 证书池类型名称
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/get-certificate-rule' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751009482524' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
  "spuName": "a250620506652"
}'
```

### 响应示例

```text
{
  "code": "0",
  "msg": "OK",
  "info": {
    "data": [
      {
        "certificateTypeId": 230,
        "mergeSiteInfoList": [
          {
            "mergeSiteName": "欧洲",
            "subSiteList": [
              "SHEIN西班牙站"
            ]
          }
        ],
        "certificateTypeValue": "EN ISO16321检测报告",
        "fileModelUrl": "",
        "certificateDimension": 1,
        "certificateLabel": 0,
        "certificateMissStatus": false,
        "isRequired": true,
        "certificatePoolList": [
          {
            "certificatePoolId": 8623835,
            "certificateExpireStatus": 1,
            "expireTime": "2029-11-12 00:00:00",
            "auditStatus": 3,
            "pqmsCertificateSn": "spmp202411150553014",
            "certificatePoolFileList": [
              {
                "certificateUrlName": "Doc.pdf",
                "certificateUrl": "https://lt-pqms.oss-cn-shenzhen.aliyuncs.com/gpc202411150038838.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250106T051757Z&X-Amz-SignedHeaders=host&X-Amz-Expires=431999&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>"
              }
            ]
          }
        ],
        "otherSourceCertInfoList": [],
        "selfCertificateList": []
      },
      {
        "certificateTypeId": 456,
        "mergeSiteInfoList": [
          {
            "mergeSiteName": "欧洲",
            "subSiteList": [
              "SHEIN西班牙站"
            ]
          }
        ],
        "certificateTypeValue": "GPSR欧盟责任人",
        "fileModelUrl": "",
        "certificateDimension": 1,
        "certificateLabel": 0,
        "certificateMissStatus": false,
        "isRequired": false,
        "certificatePoolList": [],
        "otherSourceCertInfoList": null,
        "selfCertificateList": []
      }
    ],
    "meta": {
      "count": 2,
      "customObj": null
    }
  },
  "bbl": null,
  "traceId": "d7e2b83cdbd786ec"
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001859。