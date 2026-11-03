# 创建⽣产模板任务

`POST /open-api/ccst/v1/composite/task`

**QPS**：50 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v11 ｜ **更新时间**：2026-04-07 21:45:59 ｜ **所属权限包**：[获取定制信息](/packages/customization) ｜ **官方文档**：[3001672](https://open.sheincorp.com/documents/apidoc/detail/3001672)

## 接口说明

使用定制商品id（customInfoId）+ 模版id（compositeId）生成最终定制生产任务，需要异步查询结果

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **compositeId** `string` **必填** — 订单模板ID⽤于合成⽣产图⽚
- **customInfoId** `string` **必填** — 定制数据ID，用户定制数据的唯一标识符
- **needUpdate** `boolean` — 是否使用更新后的compositeId，如果传true则返回最新的值，传false则返回用户加购物车时的值。默认为false。

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **data** `object`
  - **id** `string` **必填** — 任务id
- **msg** `string` — 错误描述,成功：OK

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/ccst/v1/composite/task' \
--header 'x-lt-signature: test0YmYwNzJjNTEwODcyY2EwMTYxNWNlOTQ1NDI2ZDIyZTJiOWI3NjMzNGU2NWRiNGVjMDA0NTU4ODgxZTU2ODZmMw==' \
--header 'x-lt-openKeyId: 20553A76716A4299AC612C62FFEDBBF4' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1730379935947' \
--header 'Cookie: gmp_trace=46b216bcb5c344a4858282b25df07984; gsp_trace=7a3f50b4b35b4914b6775c286e10787a; pfmp_trace=0faf1c0b77d549fab42a2243ac81a6c9' \
--data-raw '{
  "customInfoId":"58d3dcb1f269463da29dc4a2957cd7a7",
  "compositeId":738329
}'
```

### 响应示例

```json
{
  "code": "0",
  "message": "OK",
  "data": {
    "id": "2559732325967204352"
  },
  "traceId": "b2380962c514ebe0"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001672。