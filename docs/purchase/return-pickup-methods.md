# 查询退货方式

`POST /open-api/purchase/return-pickup-methods`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-06-04 13:49:41 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001774](https://open.sheincorp.com/documents/apidoc/detail/3001774)

## 接口说明

当创建退货申请单或确认退货申请单时，处理方式为报废的情况下，开发者可通过此接口获取发货仓支持的退货方式

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **list** `object[]` — 查询条件
  - **subWarehouseId** `integer` — 子仓仓库id 例: `74`
  - **warehouseId** `integer` — 仓库id 例: `73`

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object[]`
  - **distributionTypeList** `object[]` — 对应的退货方式
    - **distributionType** `integer` — 配送方式类型：1-SHEIN合作物流；4-自提/自送； 例: `13`
    - **distributionTypeName** `string` — 配送方式类型名称 例: `random_distributionTypeName`
  - **fallBackDistributionType** `object` — 兜底退货方式
    - **distributionType** `integer` — 配送方式类型：1-SHEIN合作物流；4-自提/自送； 例: `72`
    - **distributionTypeName** `string` — 配送方式类型名称 例: `random_distributionTypeName`
  - **uniqueKey** `string` 例: `random_uniqueKey`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/shipping/express-company-list-v2' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570817402' \
--data-raw '{
  "list" : []
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "uniqueKey": "214989671768445724420",
      "distributionTypeList": [
        {
          "distributionType": 1,
          "distributionTypeName": "SHEIN合作物流"
        },
        {
          "distributionType": 4,
          "distributionTypeName": "自提/自送"
        }
      ]
    }
  ],
  "bbl": {},
  "traceId": "da3f0fa7585cc4f5"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001774。