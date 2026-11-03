# 库存接口-实时库存同步(仅代运营&自营模式)

`POST /open-api/stock/access`

**合作模式**：全托管 / SHEIN自营 / POP ｜ **文档版本**：v10 ｜ **更新时间**：2024-11-06 20:05:53 ｜ **所属权限包**：[库存同步](/packages/inventory-sync) ｜ **官方文档**：[3000589](https://open.sheincorp.com/documents/apidoc/detail/3000589)

## 接口说明

采购商更新商家仓接口，传统平台和半托管商家请勿使用。该接口逐渐废弃，请使用新接口：/open-api/goods/stock-update
商家可以通过该接口进行实时库存同步，支持全量和增量方式
参数校验通过 同步返回本次请求的批次号，并返回失败明细列表
1、若available_number非空，取available_number作为【新实际库存】
2、若available_number为空，
2.1、stock_type=1，取【原实际库存】+access_number作为【新实际库存】
2.2、stock_type=2，取【原实际库存】-access_number作为【新实际库存】
2.3、stock_type=3，取access_number作为【新实际库存】

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **stock** `object[]` **必填** — 库存出入库信息 单次记录数不超过200条
  - **stock_type** `integer` **必填** — stock_type 出入库类型：1、入库；2、出库；3、全量库存，请根据实际业务场景入参
  - **skc** `string` — skc
  - **shein_sku** `string` — shein 系统 sku(等同sku_code)
  - **access_number** `double` — 操作数量：stock_type=1，新实际库存=原实际库存+access_number；stock_type=2，新实际库存=原实际库存-access_number；stock_type=3，新实际库存=access_number(不建议使用此字段)
  - **remark** `string` — 备注 不超过100个字符
  - **available_number** `string` — 若available_number非空，取available_number作为【新实际库存】，推荐使用此字段

## 响应参数

- **code** `integer` 例: `0`
- **msg** `string` 例: `提交出入库成功`
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪
- **info** `object` **必填**
  - **batch_number** `string` — 批次号 根据批次号查询时 可用到 例: `201907170001`
  - **fail_number** `integer` — 失败数目
  - **fail_list** `object[]` — 失败明细数组
    - **stock_type** `integer` — 出入库类型 1、入库 2、出库 ，3 全量同步库存
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

```text
{
    "stock": [
        {
            // tock_type 出入库类型：1、入库；2、出库；3、全量库存，请根据实际业务场景入参
            "stock_type": 2,
            "skc": "ss23111024694344",
            // shein 系统 sku(等同sku_code)
            "shein_sku": "I94higsnyh7g",
            //操作数量：stock_type=1，新实际库存=原实际库存+access_number；stock_type=2，新实际库存=原实际库存-access_number；stock_type=3，新实际库存=access_number(不建议使用此字段)
            "access_number": 1,
            //备注 不超过100个字符
            "remark": "测试啦啊啦啦",
            // 若available_number非空，取available_number作为【新实际库存】，推荐使用此字段
            "available_number": null
        }
    ]
}
// 1、若available_number非空，取available_number作为【新实际库存】
// 2、若available_number为空，
//  2.1、stock_type=1，取【原实际库存】+access_number作为【新实际库存】
//  2.2、stock_type=2，取【原实际库存】-access_number作为【新实际库存】
// 2.3、stock_type=3，取access_number作为【新实际库存】
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "batch_number": "202311151000001",
    "fail_num": 0,
    "fail_list": []
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3000589。