# 获取环保标配置规则

`POST /open-api/goods-quality/environmental-label-rule/list`

**QPS**：5 ｜ **合作模式**：全托管 / SHEIN自营 ｜ **文档版本**：v17 ｜ **更新时间**：2025-06-27 15:59:35 ｜ **所属权限包**：[商家服务-商品](/packages/merchant-goods) ｜ **官方文档**：[3001185](https://open.sheincorp.com/documents/apidoc/detail/3001185)

## 接口说明

该API支持获取环保标配置规则。
此接口会在2025年08月31日下线，请迁移使用新接口查询：/open-api/goods-quality/environmental-label-rule/material-quality-tree-v2

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **environmentInfoList** `object[]` **必填** — 获取环保标请求列表
  - **categoryId** `int64` **必填** — 末级分类ID,通过商品详情接口获取对应需要打印SKU的末级分类ID
  - **materialInfoList** `object[]` **必填** — 耗材信息列表（最大三个）
    - **materialQualityId** `int64` **必填** — 耗材材质ID（预设资料属性ID）
    - **materialTypeId** `int64` **必填** — 耗材类型ID（预设资料属性ID）
  - **skc** `string` **必填** — skc即skc_name，是商品发布SHEIN生成的系统编码

## 响应参数

- **bbl** `object` — 响应异常时的bbl相关信息
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **data** `object[]` — 结果
    - **categoryId** `int64` — 末级分类id
    - **categoryName** `string` — 末级分类名称
    - **isNeedFranceLabel** `integer` — 是否法国标：1-需要法国标 2-不需要法国标
    - **ruleIdList** `string[]` — 环保标规则ID,注：环保标规则会更新，不能提前下载
    - **size** `string` — 尺寸描述，如：标准标60*40
    - **sizeId** `integer` — 尺寸枚举，1:60*40;2:50*30;3:50*40;4:80*60;6:15*15;7:70*20
    - **skc** `string` — SHEIN SKC编码
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-quality/environmental-label-rule/list' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751011123568' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
	"environment_info_list": [{
			"category_id": 2325,
			"material_info_list": [{
				"material_quality_id": 240111360,
				"material_type_id": 240111343
			}],
			"skc": "ss21090356553513"
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
        "skc": "ss21090356553513",
        "category_id": 2325,
        "category_name": "男士运动T恤&背心",
        "size": "15*15",
        "size_id": 6,
        "rule_id_list": [
          "QMCELR20230508000003"
        ],
        "is_need_france_label": 1
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

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001185。