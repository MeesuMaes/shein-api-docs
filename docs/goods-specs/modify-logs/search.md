# 查询修改销售属性审核记录

`POST /open-api/goods-specs/modify-logs/search`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-10-26 11:50:14 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002078](https://open.sheincorp.com/documents/apidoc/detail/3002078)

## 接口说明

提交销售属性修改后，有独立的审核流程，审核通过后才能用新的销售属性数据进行编辑或复色加码。此接口可查询商品的审核记录详情。修改销售属性的整体解决方案，请点击查看文档。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识openKeyId，获取方式请查阅：授权手册。
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为将当前时间转换为毫秒值，即从1970年1月1日起至今的毫秒数，例如：1583398764000。
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则。
- **language** `string` — 用于指定返回错误信息的语种，默认返回中文。支持的语言代码如下：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **page_num** `integer` **必填** — 页码，从1开始
- **page_size** `integer` **必填** — 每页条数，最大100
- **spu_name** `string` **必填** — SPU编码，SHEIN生成的编码

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object` — 结果
  - **data** `object[]` — 结果
    - **change_list** `object[]` — 属性变动明细
      - **after** `string` — 变更后销售属性组合值，支持多语言（根据请求头的language返回）
      - **before** `string` — 变更前销售属性组合值，支持多语言（根据请求头的language返回）
    - **fail_reason** `string` — 失败原因，仅审核失败时有值，支持多语言
    - **flow_sn** `string` — 审核单号
    - **status** `integer` — 审核状态(1:待审核,2:审核成功,3:审核失败)
    - **submit_time** `string` — 提交时间，格式 yyyy-MM-dd HH:mm:ss，时区 UTC+8
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods-specs/modify-logs/search' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1792986553710' \
--header 'language: en' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: openapi-test01.sheincorp.cn' \
--header 'Connection: keep-alive' \
--data-raw '{
    "spu_name": "s2610261147729597",
    "page_size":100,
    "page_num":1
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
        "flow_sn": "SPMBMS261026174268673",
        "status": 1,
        "fail_reason": null,
        "change_list": [
          {
            "before": "Color:Royal Blue-Size:XXXL",
            "after": "Color:Royal Blue-Size:XXXL-number of pieces:4pcs"
          }
        ],
        "submit_time": "2026-10-26 11:49:06"
      }
    ],
    "meta": {
      "count": 1,
      "customObj": null
    }
  },
  "bbl": null,
  "traceId": "181827388457046f"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002078。