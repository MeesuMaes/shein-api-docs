# 批量打印环保标

`POST /open-api/goods-quality/environmental-label-rule/print`

**QPS**：5 ｜ **合作模式**：全托管 / SHEIN自营 ｜ **文档版本**：v16 ｜ **更新时间**：2025-06-27 16:02:08 ｜ **所属权限包**：[商家服务-商品](/packages/merchant-goods) ｜ **官方文档**：[3001186](https://open.sheincorp.com/documents/apidoc/detail/3001186)

## 接口说明

该API支持批量打印环保标。
此接口会在2025年08月31日下线，请迁移使用新接口查询：/open-api/goods-compliance/label-print

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **infoList** `object[]` **必填** — 批量打印环保标请求列表
  - **isNeedFranceLabel** `integer` **必填** — 是否法国标：1-需要法国标 2-不需要法国标
  - **ruleIdList** `string[]` **必填** — 环保标规则ID
  - **sizeId** `integer` **必填** — 尺寸枚举；1:60*40;2:50*30;3:50*40;4:80*60;6:15*15;7:70*20；枚举是所有获取到可能的环保标尺寸 尺寸的大小是基于商家命中哪一个环保标规则，没有办法提前知道尺寸
  - **uid** `string` **必填** — 行位符，如果按照skc批量打印，可以用该字段标识；行位符，是个标识，当你一次打印多个skc的时候，需要明确是第几行

## 响应参数

- **bbl** `object` — 响应异常时的bbl相关信息
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **data** `object[]` — 结果
    - **uid** `string` — UID
    - **url** `string` — pdf url
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-quality/environmental-label-rule/print' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751011254610' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
	"infoList": [{
		"ruleIdList": ["QMCELR20231228000003"],
		"uid": "42",
		"isNeedFranceLabel": 2,
		"sizeId": 4
	}]
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
        "uid": "42",
        "url": "https://pdf-test01.dotfashion.cn/pdf-proxy/pdf2-test/qmc/2024/2/20/1708412372553-8c2240f675fb76b701fce2f39d286614.oss.pdf"
      }
    ],
    "meta": {
      "count": 1,
      "customObj": null
    }
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001186。