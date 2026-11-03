# 绑定SKC和实拍图

`POST /open-api/goods-compliance/skc-save-label`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v4 ｜ **更新时间**：2025-09-29 19:19:23 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001399](https://open.sheincorp.com/documents/apidoc/detail/3001399)

## 接口说明

绑定SKC和实拍图，若实拍图信息符合要求，则绑定成功。
实拍图场景整体解决方案，可点击查看文档。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400
- **x-lt-signature** `string` **必填** — 查看签名生成规则
- **language** `string` — 指定出参语种，默认中文；支持语种:英语:EN 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **skcList** `string[]` **必填** — SKC
- **packageLableList** `object[]` — 包装类型标签实拍图
  - **imageUrl** `string` — 图片的url。需通过接口转换获得/open-api/goods-compliance/label-print
  - **imageMd5** `string` — 图片的md5。需通过接口转换获得/open-api/goods-compliance/label-print
- **bodyLableList** `object[]` — 商品本体类标签实拍图
  - **imageUrl** `string` — 图片的url。需通过接口转换获得/open-api/goods-compliance/label-print
  - **imageMd5** `string` — 图片的md5。需通过接口转换获得/open-api/goods-compliance/label-print
- **skcLablePicList** `object[]` — 此字段后续将废弃，请勿再对接。
  - **imageUrl** `string` — 此字段后续将废弃，请勿再对接。
  - **imageMd5** `string` — 此字段后续将废弃，请勿再对接。

## 响应参数

- **code** `string` — 响应码。正常为“0”。
- **msg** `string` — 响应信息。正常为“OK”。
- **info** `object` — 响应详细信息
  - **totalCount** `integer` — 合计任务数
  - **successCount** `integer` — 成功任务数
  - **faildCount** `integer` — 失败任务数
  - **faildList** `object[]` — 失败明细
    - **skc** `string` — 失败的skc
    - **code** `string` — 响应码
    - **reason** `string` — 失败原因
- **traceId** `string` — 请求追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-compliance/skc-save-label' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751008346358' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "skcList": ["s2412135525"],
    "skcLablePicList": [
        {
            "imageUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc2830451623024715776.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250506T072103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=432000&X-Amz-Credential=<REDACTED>&X-Amz-Signature=<REDACTED>",
            "imageMd5": "f39f382f05acf958c9ba4667dce9b1d0"
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
    "totalCount": 1,
    "successCount": 0,
    "faildCount": 1,
    "faildList": [
      {
        "skc": "s2412134534525",
        "code": "0108",
        "reason": "当前SKC无需上传实拍标签信息，系统已经自动过滤，无需再次操作"
      }
    ]
  },
  "traceId": "e5e3e7147ee7f3ca"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001399。