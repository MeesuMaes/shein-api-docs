# 全托管/SHEIN自营商家库存更新

`POST /open-api/goods/stock-update`

**QPS**：100 ｜ **合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v7 ｜ **更新时间**：2025-07-21 11:32:54 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment)、[库存同步](/packages/inventory-sync) ｜ **官方文档**：[3001304](https://open.sheincorp.com/documents/apidoc/detail/3001304)

## 接口说明

该API用于更新代运营（又称全托管、简易平台）和SHEIN自营商家的库存，接口支持全量方式更新；
⚠️注意：自主运营和半托管模式应用请勿使用；

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **stock** `object[]` **必填** — 库存出入库信息 单次记录数不超过200条
  - **skc** `string` **必填** — SHEIN平台生成的SKC，相当于商品发布的skc_name
  - **shein_sku** `string` **必填** — SHEIN平台生成的SKU，相当于商品发布的skucode
  - **remark** `string` — 备注 不超过100个字符
  - **available_number** `string` **必填** — 实际库存数量；
  - **stock_type** `string` **必填** — 默认传3，全量覆盖

## 响应参数

- **code** `integer` 例: `0`
- **msg** `string` 例: `提交出入库成功`
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪
- **info** `object` **必填**
  - **batch_number** `string` — 批次号 根据批次号查询时 可用到 例: `201907170001`
  - **fail_number** `integer` — 失败数目
  - **fail_list** `object[]` — 失败明细数组
    - **stock_type** `integer` — 3为全量同步库存
    - **sku** `string` — 商品sku与入参一致
    - **skc** `string` — 商品skc
    - **shein_sku** `string` — shein 平台sku
    - **attribute** `string` — 属性集
    - **access_number** `integer` — 出入库数目
    - **remark** `string` — 出入库备注
    - **fail_code** `string` — 出入库错误码
    - **fail_msg** `string` — 出入库错误原因

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/stock-update' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
	"stock": [{
		"stock_type": 3,
		"skc": "sx2410224003123100",
		"shein_sku": "I83ty0f2d502",
		"available_number": 18
	}, {
		"stock_type": 3,
		"skc": "sx2410224003123100",
		"shein_sku": "I83ty0f2h5hc",
		"available_number": 16
	}, {
		"stock_type": 3,
		"skc": "sx2410224003123100",
		"shein_sku": "I83ty0f2ks18",
		"available_number": 7
	}, {
		"stock_type": 3,
		"skc": "sx2410224003123100",
		"shein_sku": "I83ty0f2o8d4",
		"available_number": 0
	}{
		"stock_type": 3,
		"skc": "sx2410220100534309",
		"shein_sku": "I83txx7ku2my",
		"available_number": 12
	}, {
		"stock_type": 3,
		"skc": "sx2410220100534309",
		"shein_sku": "I83txx7kyffc",
		"available_number": 8
	}, {
		"stock_type": 3,
		"skc": "sx2410220100534309",
		"shein_sku": "I83txx7l2vdw",
		"available_number": 1
	}, {
		"stock_type": 3,
		"skc": "sx2410220100534309",
		"shein_sku": "I83txx7l6a2o",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254070290",
		"shein_sku": "I23txvm9lzi4",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254070290",
		"shein_sku": "I23txvm9qgsn",
		"available_number": 4
	}, {
		"stock_type": 3,
		"skc": "sx2410221254070290",
		"shein_sku": "I23txvm96qgl",
		"available_number": 12
	}, {
		"stock_type": 3,
		"skc": "sx2410221254070290",
		"shein_sku": "I23txvm9aryk",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254070290",
		"shein_sku": "I23txvm9emg9",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254070290",
		"shein_sku": "I23txvm9i56p",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254034919",
		"shein_sku": "I23txvmbfoe9",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254034919",
		"shein_sku": "I23txvmbjrjf",
		"available_number": 4
	}, {
		"stock_type": 3,
		"skc": "sx2410221254034919",
		"shein_sku": "I23txvmavt8m",
		"available_number": 12
	}, {
		"stock_type": 3,
		"skc": "sx2410221254034919",
		"shein_sku": "I23txvmb0jj8",
		"available_number": 6
	}, {
		"stock_type": 3,
		"skc": "sx2410221254034919",
		"shein_sku": "I23txvmb4qxl",
		"available_number": 4
	}, {
		"stock_type": 3,
		"skc": "sx2410221254034919",
		"shein_sku": "I23txvmbarhr",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254011559",
		"shein_sku": "I23txvmd3fup",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254011559",
		"shein_sku": "I23txvmd7gcl",
		"available_number": 1
	}, {
		"stock_type": 3,
		"skc": "sx2410221254011559",
		"shein_sku": "I23txvmcj05d",
		"available_number": 1
	}, {
		"stock_type": 3,
		"skc": "sx2410221254011559",
		"shein_sku": "I23txvmcnkfh",
		"available_number": 6
	}, {
		"stock_type": 3,
		"skc": "sx2410221254011559",
		"shein_sku": "I23txvmcsr69",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254011559",
		"shein_sku": "I23txvmcymd2",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410221254075505",
		"shein_sku": "I23txvmdzc81",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799301842",
		"shein_sku": "I13xg8k2fsea",
		"available_number": 8
	}, {
		"stock_type": 3,
		"skc": "sx2410222799301842",
		"shein_sku": "I13xg8k2ldy1",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799301842",
		"shein_sku": "I13xg8k2rs9p",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799336681",
		"shein_sku": "I13xg8k3t5tr",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799343532",
		"shein_sku": "I13xg8k4nh8r",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799346161",
		"shein_sku": "I13xg8k5q5cc",
		"available_number": 1
	}, {
		"stock_type": 3,
		"skc": "sx2410222799346161",
		"shein_sku": "I13xg8k5uf66",
		"available_number": 7
	}, {
		"stock_type": 3,
		"skc": "sx2410222799346161",
		"shein_sku": "I13xg8k55pi5",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799346161",
		"shein_sku": "I13xg8k5a7ge",
		"available_number": 12
	}, {
		"stock_type": 3,
		"skc": "sx2410222799346161",
		"shein_sku": "I13xg8k5ezw6",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799346161",
		"shein_sku": "I13xg8k5kavv",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799344440",
		"shein_sku": "I13xg8k6krmx",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410222799344440",
		"shein_sku": "I13xg8k6orhm",
		"available_number": 8
	}, {
		"stock_type": 3,
		"skc": "sx2410222799344440",
		"shein_sku": "I13xg8k64fmt",
		"available_number": 10
	}, {
		"stock_type": 3,
		"skc": "sx2410222799344440",
		"shein_sku": "I13xg8k67yqg",
		"available_number": 8
	}, {
		"stock_type": 3,
		"skc": "sx2410222799344440",
		"shein_sku": "I13xg8k6dudg",
		"available_number": 5
	}, {
		"stock_type": 3,
		"skc": "sx2410222799344440",
		"shein_sku": "I13xg8k6hoxy",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410235191171176",
		"shein_sku": "I33ulkf11oph",
		"available_number": 1
	}, {
		"stock_type": 3,
		"skc": "sx2410235191171176",
		"shein_sku": "I33ulkf16pez",
		"available_number": 25
	}, {
		"stock_type": 3,
		"skc": "sx2410235191171176",
		"shein_sku": "I33ulkf0g2bc",
		"available_number": 42
	}, {
		"stock_type": 3,
		"skc": "sx2410235191171176",
		"shein_sku": "I33ulkf0mf9t",
		"available_number": 48
	}, {
		"stock_type": 3,
		"skc": "sx2410235191171176",
		"shein_sku": "I33ulkf0qyki",
		"available_number": 9
	}, {
		"stock_type": 3,
		"skc": "sx2410235191171176",
		"shein_sku": "I33ulkf0w10s",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410235191116114",
		"shein_sku": "I33ulkf27799",
		"available_number": 0
	}, {
		"stock_type": 3,
		"skc": "sx2410235191116114",
		"shein_sku": "I33ulkf2dwfz",
		"available_number": 4
	}, {
		"stock_type": 3,
		"skc": "sx2410235191116114",
		"shein_sku": "I33ulkf1fsuw",
		"available_number": 8
	}, {
		"stock_type": 3,
		"skc": "sx2410235191164731",
		"shein_sku": "I33ulkf49jar",
		"available_number": 0
	}]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "batch_number": "202412251833184",
    "fail_num": 0,
    "fail_list": []
  },
  "bbl": null,
  "traceId": "185259a2759646b2"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001304。