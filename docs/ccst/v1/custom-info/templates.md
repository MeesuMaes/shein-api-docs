# 获取模版数据

`GET /open-api/ccst/v1/custom-info/templates`

**QPS**：50 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v11 ｜ **更新时间**：2026-04-07 21:38:25 ｜ **所属权限包**：[获取定制信息](/packages/customization) ｜ **官方文档**：[3001670](https://open.sheincorp.com/documents/apidoc/detail/3001670)

## 接口说明

接口请求通讯成功统一返回 httpcode 200
返回body code错误码描述：
100001:CustomInfoId字段是为必填项
120001:未找到模版数据
120002:商家ID不匹配
130002:该IP已达到1分钟60次限制
100002:请求异常
9999:未知系统错误

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **data** `object`
  - **customInfoId** `string` — 定制数据ID，用户定制数据的唯一标识符
  - **template** `object[]`
    - **compositeId** `string` **必填** — 订单模板ID⽤于合成⽣产图⽚
    - **title** `string` — 模板标题

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi-test01.sheincorp.cn/open-api/ccst/v1/custom-info/templates?customInfoId=58d3dcb1f269463da29dc4a2957cd7a7' \
--header 'x-lt-signature: test0MTlhM2I3NmE5NTQwZjYyNjRhNmJiYWJjMGRkN2U3ZmZkNGVjODFiMzY5ZWYwZGE1ZDMyMzgzZTcwNmZkNTMwMw==' \
--header 'x-lt-openKeyId: 20553A76716A4299AC612C62FFEDBBF4' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1730379827105' \
--data-raw ''
```

### 响应示例

```json
{
  "code": "0",
  "message": "OK",
  "data": {
    "customInfoId": "58d3dcb1f269463da29dc4a2957cd7a7",
    "template": [
      {
        "title": "jing测试(1)",
        "compositeId": "738329"
      }
    ]
  },
  "traceId": "87aaa3af324c707a"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001670。