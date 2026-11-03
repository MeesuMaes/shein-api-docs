# 查询证书所需上传资料

`POST /open-api/goods/get-all-certificate-type-list`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v9 ｜ **更新时间**：2025-01-01 20:35:25 ｜ **所属权限包**：[上传商品证书](/packages/product-certificate) ｜ **官方文档**：[3000833](https://open.sheincorp.com/documents/apidoc/detail/3000833)

## 接口说明

该API支持查询全量证书所需的资料，用于让开发者了解上传证书所需要填写的信息，比如：检测机构、电池型号、产品型号、证书编号、证书生效时间、证书失效时间等信息

## 请求头

- **language** `string` **必填** — language
- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

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
    - **certificateLabel** `string` — 证书类型标识(0:普通类型 1:自符类型)
    - **certificateType** `string` — 证书类型名称；比如欧洲食品接触类检测报告
    - **certificateTypeId** `int64` — 证书类型id
    - **fileModelUrl** `string` — CPC证书下载模板的链接;如果是CPC证书，需要按照模板内容填写信息，再通过接口上传证书文件
    - **isEnabled** `integer` — 证书类型状态（0:不启用 1:启用)
    - **otherPresetInfoList** `object[]` — 证书关联的字段信息
      - **inputType** `integer` — 证书信息录入方式(1:单选,2:多选,3:手动录入,4:日期格式)
      - **isRequired** `integer` — 证书字段是否必填(0:否,1:是)
      - **presetId** `int64` — 证书字段id
      - **presetName** `string` — 证书字段名CODE
      - **presetRemark** `string` — 证书字段名的描述
      - **presetValueList** `object[]` — 证书字段所需填写的字段值信息；比如 危险品分类（证书字段），可选择爆炸品、易燃液体、易燃固体等字段值
        - **presetValue** `string` — 证书字段值的描述
        - **presetValueId** `int64` — 证书字段值ID
      - **sourceFrom** `string` — 证书字段来源
      - **unit** `string` — 证书字段的单位
    - **presetInfoList** `object[]` — 证书关联的字段信息
      - **inputType** `integer` — 证书信息录入方式(1:单选,2:多选,3:手动录入,4:日期格式)
      - **isRequired** `integer` — 证书字段是否必填(0:否,1:是)
      - **presetId** `int64` — 【注意！！以下信息更新时间为2023-08-24号，梳理只是为了外围更好对接，请以最新线上证书类型配置为准，】关联字段id : 169:出证日期 [手填-日期格式] 170:产品名称 [手填] 171:电池型号 [手填] 172:证书编号 [手填] 173:检测机构 [下拉 可选项: BV(240094316) \| ITS(240094317) \| SGS(240094315) \| TUV(240094318) \| UL(240094319) \| 上海化工院检测有限公司(240094499) \| 其他(240094322) \| 广检(240094321) \| 广电(240094320) \| 立标检测认证集团（天津津检）(240094500) \| 谱尼(240094324) \| 迪捷姆(240094325)] 175:证书生效时间 [手填-日期格式] 176:证书更新提示时间 [手填]177:产品型号 [手填]178:证书失效时间 [手填-日期格式]183:检测机构（SRM的）[查srm检测机构 + 实验室]184:签署方式 [下拉 可选项: 本地上传(240094422) \| 线上签署(240094423)]185:证书类型标识 [下拉 可选项:自符声明(240094424)]186:检测机构判定结论 [下拉 可选项: 运输危险品(240094501) \| 非运输危险品(240094502)]187:危险品分类 [下拉 可选项: 第一类（爆炸品）(240094503) \| 第二类（气体）(240094504) \| 第三类（易燃液体）(240094505) \| 第四类（易燃固体）(240094506) \| 第五类（氧化剂和有机过氧化物）(240094507) \| 第六类（毒性物质和感染性物质）(240094508) \| 第七类（放射性物质）(240094509) \| 第八类（腐蚀性物质）(240094510) \| 第九类（杂项危险品）(240094511)]
      - **presetName** `string` — 证书字段名CODE
      - **presetRemark** `string` — 证书字段名的描述
      - **presetValueList** `object[]` — 证书字段所需填写的字段值信息；比如 危险品分类（证书字段），可选择爆炸品、易燃液体、易燃固体等字段值
        - **presetValue** `string` — 证书字段值的描述
        - **presetValueId** `int64` — 证书字段值ID
      - **unit** `string` — 证书字段的单位
    - **srmDetectionAgencyList** `object[]` — srm检测机构和实验室信息
      - **detectionAgency** `object` — SRM检测机构
        - **detectionAgencyId** `int64` — 检测机构id
        - **detectionAgencyName** `string` — 检测机构名称
      - **laboratoryList** `object[]` — SRM检测机构下所有实验室
        - **laboratoryId** `int64` — 实验室id
        - **laboratoryName** `string` — 实验室名称
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 响应示例

```text
{
    "code": "0",
    "msg": "OK",
    "info": {
        "data": [
            {
                "certificateTypeId": 1,
                "certificateLabel": 1,
                "certificateType": "自符类型证书-01certificate_type_id1",
                "certificateDimension": 1,
                "fileModelUrl": "http://filetest.ltwebstatic.com/pqmsfile/2023/12/11/78/17022631422752902183.jpg",
                "isEnabled": 1,
                "srmDetectionAgencyList": null,
                "presetInfoList": [
                    {
                        "presetId": 230,
                        "presetName": "signing_method",
                        "presetRemark": "signing_methodpreset_name230",
                        "inputType": 1,
                        "unit": "",
                        "isRequired": 1,
                        "presetValueList": [
                            {
                                "presetValueId": 240108177,
                                "presetValue": "线上签署preset_value240108177"
                            },
                            {
                                "presetValueId": 240108176,
                                "presetValue": "本地上传preset_value240108176"
                            }
                        ]
                    },
                    {
                        "presetId": 232,
                        "presetName": "Certificate label",
                        "presetRemark": "Certificate labelpreset_name232",
                        "inputType": 2,
                        "unit": "",
                        "isRequired": 1,
                        "presetValueList": [
                            {
                                "presetValueId": 240108180,
                                "presetValue": "自符声明preset_value240108180"
                            }
                        ]
                    }
                ],
                "otherPresetInfoList": []
            },
            {
                "certificateTypeId": 2,
                "certificateLabel": 1,
                "certificateType": "自符类型证书-02certificate_type_id2",
                "certificateDimension": 1,
                "fileModelUrl": "",
                "isEnabled": 1,
                "srmDetectionAgencyList": null,
                "presetInfoList": [
                    {
                        "presetId": 232,
                        "presetName": "Certificate label",
                        "presetRemark": "Certificate labelpreset_name232",
                        "inputType": 2,
                        "unit": "",
                        "isRequired": 1,
                        "presetValueList": [
                            {
                                "presetValueId": 240108180,
                                "presetValue": "自符声明preset_value240108180"
                            }
                        ]
                    },
                    {
                        "presetId": 230,
                        "presetName": "signing_method",
                        "presetRemark": "signing_methodpreset_name230",
                        "inputType": 1,
                        "unit": "",
                        "isRequired": 1,
                        "presetValueList": [
                            {
                                "presetValueId": 240108176,
                                "presetValue": "本地上传preset_value240108176"
                            },
                            {
                                "presetValueId": 240108177,
                                "presetValue": "线上签署preset_value240108177"
                            }
                        ]
                    }
                ],
                "otherPresetInfoList": []
            },
            {
                "certificateTypeId": 3,
                "certificateLabel": 0,
                "certificateType": "我是证书类型id3certificate_type_id3",
                "certificateDimension": 1,
                "fileModelUrl": "",
                "isEnabled": 1,
                "srmDetectionAgencyList": null,
                "presetInfoList": [
                    {
                        "presetId": 213,
                        "presetName": "product_description",
                        "presetRemark": "product_descriptionpreset_name213",
                        "inputType": 3,
                        "unit": "",
                        "isRequired": 0,
                        "presetValueList": null
                    },
                    {
                        "presetId": 210,
                        "presetName": "testing_organization",
                        "presetRemark": "testing_organizationpreset_name210",
                        "inputType": 1,
                        "unit": "",
                        "isRequired": 0,
                        "presetValueList": [
                            {
                                "presetValueId": 240108094,
                                "presetValue": "ITSpreset_value240108094"
                            },
                            {
                                "presetValueId": 240108092,
                                "presetValue": "SGSpreset_value240108092"
                            },
                            {
                                "presetValueId": 240108093,
                                "presetValue": "BVpreset_value240108093"
                            }
                        ]
                    },
                    {
                        "presetId": 216,
                        "presetName": "certificate_effective_time",
                        "presetRemark": "certificate_effective_timepreset_name216",
                        "inputType": 4,
                        "unit": "",
                        "isRequired": 1,
                        "presetValueList": null
                    },
                    {
                        "presetId": 187,
                        "presetName": "Dangerous_goods_classification",
                        "presetRemark": "危险品分类",
                        "inputType": 1,
                        "unit": "",
                        "isRequired": 1,
                        "presetValueList": [
                            {
                                "presetValueId": 240094503,
                                "presetValue": "第一类（爆炸品）"
                            }
                        ]
                    }
                ],
                "otherPresetInfoList": [
                    {
                        "sourceFrom": "SRM",
                        "presetId": 229,
                        "presetName": "Testing organization",
                        "presetRemark": "Testing organizationpreset_name229",
                        "inputType": 1,
                        "unit": "",
                        "isRequired": 0,
                        "presetValueList": [
                            {
                                "presetValueId": 456549082,
                                "presetValue": "天津津检危险品技术品有限公司preset_value456549082"
                            },
                            {
                                "presetValueId": 456549074,
                                "presetValue": "检测项目变更机构55preset_value456549074"
                            },
                            {
                                "presetValueId": 456549060,
                                "presetValue": "新机构4preset_value456549060"
                            },
                            {
                                "presetValueId": 456549056,
                                "presetValue": "新机构3preset_value456549056"
                            },
                            {
                                "presetValueId": 456549052,
                                "presetValue": "新机构2preset_value456549052"
                            }
                        ]
                    }
                ]
            },
         ],
        "meta": {
            "count": 270,
            "customObj": null
        }
    },
    "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3000833。