# 查询SKC的实拍图要求

`POST /open-api/goods-compliance/skc-label-list`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v6 ｜ **更新时间**：2025-09-24 19:40:32 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001394](https://open.sheincorp.com/documents/apidoc/detail/3001394)

## 接口说明

查询哪些SKC需要上传实拍图，以及实拍图内需要体现哪些信息元素。
实拍图场景的整体解决方案，可点击查看文档。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400
- **x-lt-signature** `string` **必填** — 查看签名生成规则
- **language** `string` — 指定出参语种，默认中文；支持语种:英语:EN 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **pageSize** `integer` **必填** — 每页条数，最多100
- **pageNum** `integer` **必填** — 分页页数，建议从1开始查询
- **skcList** `string[]` **必填** — SKC，支持批量查询
- **skcShelfStatusList** `integer[]` — SKC的上下架状态。0-待上架；1-已上架；2-已下架；3-售罄
- **reviewStatusList** `integer[]` — skc上传的实拍图中某个信息元素的审核状态。1-待上传；2-生效中；3-审核不通过。 若想查询商家当前急需上传的信息元素，建议入参1/3
- **isRequired** `integer` — SKC上传的实拍图中，某个信息元素是否必须体现。 0-否, 1-是, 10-未知（SKC生成时的瞬间状态，可忽略）

## 响应参数

- **code** `string` — 响应码。正常为“0”。
- **msg** `string` — 响应信息。正常为“OK”。
- **info** `object[]` — 响应详细信息
  - **skc** `string` — SKC
  - **skcShelfStatus** `string[]` — SKC的上下架状态。0-待上架；1-已上架；2-已下架；3-售罄
  - **skcLabelInfoList** `object[]` — SKC上传的实拍图中需要被识别的内容
    - **isRequired** `integer` — 识别内容是否必须。0-否, 1-是, 10-未知（SKC生成时的瞬间状态，若拉到此值建议过一会再重试一次）
    - **labelId** `int64` — 识别内容ID
    - **labelName** `string` — 识别内容名称
    - **labelGroup** `string` — 识别内容属于包装还是本体。即包含此内容的标签需要贴在哪里。 1=商品本体，2=外包装
    - **siteList** `string[]` — 识别内容影响的站点
    - **reviewStatus** `integer` — 内容的识别结果。 0-待提交；1-审核中（此状态在商家后台展示位通过，API层面亦可理解为通过）；2-通过；3-不通过。 注意：入参的reviewStatusList枚举值，和出参的reviewStatus不一样。入参1，出参0；入参2，出参1/2；入参3，出参3。
    - **failReason** `string[]` — 审核驳回原因。仅审核不通过时有值
- **traceId** `string` — 请求追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-compliance/skc-label-list' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751007220030' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
    "pageSize":10,
    "pageNum":1,
    "skcList":["dress14041203"]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "skc": "sh2412030799611160",
      "failReasonList": null,
      "skcShelfStatus": 0,
      "skcLabelInfoList": [
        {
          "isRequired": 1,
          "labelId": 2,
          "labelName": "Electronic Recycling Mark",
          "siteList": [
            "SHEIN奥地利站",
            "SHEIN德国站"
          ],
          "reviewStatus": 0
        },
        {
          "isRequired": 1,
          "labelId": 4,
          "labelName": "Model",
          "siteList": [
            "SHEIN奥地利站",
            "SHEIN德国站"
          ],
          "reviewStatus": 0
        },
        {
          "isRequired": 1,
          "labelId": 5,
          "labelName": "Electrical parameters",
          "siteList": [
            "SHEIN奥地利站",
            "SHEIN德国站"
          ],
          "reviewStatus": 0
        },
        {
          "isRequired": 1,
          "labelId": 8,
          "labelName": "Manufacturer",
          "siteList": [
            "SHEIN奥地利站",
            "SHEIN德国站"
          ],
          "reviewStatus": 0
        },
        {
          "isRequired": 1,
          "labelId": 9,
          "labelName": "Manufacturer Address",
          "siteList": [
            "SHEIN奥地利站",
            "SHEIN德国站"
          ],
          "reviewStatus": 0
        },
        {
          "isRequired": 1,
          "labelId": 10,
          "labelName": "Manufacturer contact information",
          "siteList": [
            "SHEIN奥地利站",
            "SHEIN德国站"
          ],
          "reviewStatus": 0
        },
        {
          "isRequired": 1,
          "labelId": 11,
          "labelName": "EU responsible person (EU|REP  or EC|REP)",
          "siteList": [
            "SHEIN奥地利站",
            "SHEIN德国站"
          ],
          "reviewStatus": 0
        },
        {
          "isRequired": 1,
          "labelId": 34,
          "labelName": "CE Mark",
          "siteList": [
            "SHEIN奥地利站",
            "SHEIN德国站"
          ],
          "reviewStatus": 0
        }
      ]
    }
  ],
  "traceId": "a5c496a1c82ccb21"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001394。