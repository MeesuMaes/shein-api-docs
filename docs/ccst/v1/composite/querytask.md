# 查询任务结果

`GET /open-api/ccst/v1/composite/queryTask`

**QPS**：50 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v8 ｜ **更新时间**：2026-04-07 21:39:00 ｜ **所属权限包**：[获取定制信息](/packages/customization) ｜ **官方文档**：[3001671](https://open.sheincorp.com/documents/apidoc/detail/3001671)

## 接口说明

接口请求通讯成功统一返回 httpcode 200
返回body code错误码描述：
100004:Id字段为必填项
120002:商家id不匹配
100008:任务未找到
130002:该IP已达到1分钟60次限制
100002:请求异常
9999:未知系统错误

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **data** `object`
  - **compositeId** `string` **必填** — 订单模板ID⽤于合成⽣产图⽚
  - **customInfoId** `string` **必填** — 定制数据ID，用户定制数据的唯一标识符
  - **failedReason** `string` — 失败原因
  - **id** `string` **必填** — 对应入参的任务id
  - **resources** `string[]` — 输出结果资源地址
  - **status** `integer` **必填** — 状态 0=⽆,1=处理中,2=成功,3=失败

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi-test01.sheincorp.cn/open-api/ccst/v1/composite/queryTask?id=2559732325967204352' \
--header 'x-lt-signature: test0MTA3ZDUxYmQzNzkzM2I4ODA3ZGVlY2Y1MmM0ZjhkODJlMTc4Nzk2MTk3ZjRlMzk5ZjRmNjU4MjAzYjU4OTlkOA==' \
--header 'x-lt-openKeyId: 20553A76716A4299AC612C62FFEDBBF4' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1730380016945' \
--header 'Cookie: gmp_trace=46b216bcb5c344a4858282b25df07984; gsp_trace=7a3f50b4b35b4914b6775c286e10787a; pfmp_trace=0faf1c0b77d549fab42a2243ac81a6c9' \
--data-raw '{
  "type": 2,
  "data": [
      {"orderNo":"J240319600007",
      "supplierSku":"b8d",
      "printNumber":"1"
      }
  ]
 
}'
```

### 响应示例

```json
{
  "code": "0",
  "message": "OK",
  "data": {
    "id": "2559732325967204352",
    "customInfoId": "58d3dcb1f269463da29dc4a2957cd7a7",
    "compositeId": "738329",
    "status": 2,
    "failedReason": "",
    "resources": [
      "http://filetest.ltwebstatic.com/filetest/2024/10/31/a1/17303799381799911581.png"
    ]
  },
  "traceId": "5c56bc7b2e5af064"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001671。