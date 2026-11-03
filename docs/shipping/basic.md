# 发货基本信息查询接口

`GET /open-api/shipping/basic`

**QPS**：50 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v21 ｜ **更新时间**：2026-08-21 19:58:22 ｜ **所属权限包**：[采购单履约](/packages/purchase-fulfillment) ｜ **官方文档**：[3001981](https://open.sheincorp.com/documents/apidoc/detail/3001981)

## 接口说明

通过该接口获取商家发货地址、发货仓、支持的发货方式、打包方式、发货车队、发货路径等发货的信息。
查询SHEIN合作物流信息需要调用 查询SHEIN合作物流产品

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-language** `string` — 指定出参语种，默认中文；支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **addressList** `object[]` — 发货地址
    - **addressId** `integer` — 地址ID
    - **addressName** `string` — 地址名称
    - **isSharedAddress** `integer` — 是否为共享发货地址
  - **deliveryTypeList** `object[]` — 发货方式
    - **deliveryTypeName** `string` — 发货方式名称，仅做参考
    - **deliveryTypeValue** `integer` — 发货方式的值
  - **expressCompanyList** `object[]` — 获取商家自行联系的物流服务商信息，SHEIN合作的物流服务商信息请通过查询SHEIN合作物流产品接口获取
    - **companyCode** `string` — 快递编码
    - **companyName** `string` — 快递公司名称
    - **isSupport** `boolean` — 服务商类型，true：SHEIN集成物流服务商，false：商家自行委托第三方物流服务商
    - **isRecommend** `string` — 是否推荐物流，1：是，2：否
  - **motorcadeList** `object[]` — 车队列表；自行委托第三方（使用车队）的发货场景下需要使用，其它的发货方式不需要使用车队。如果车队列表返回为空，则表示目前不支持使用车队发货。
    - **isSupport** `boolean` — 服务商类型；true:SHEIN集成车队；false：商家自行委托第三方车队；
    - **motorcadeId** `string` — 车队编码
    - **motorcadeName** `string` — 车队名称
  - **packageType** `integer` — 打包类型，1：包裹，2：箱唛
  - **shippingRouteList** `string` — 发货路径，0：直送路径，无需装箱明细。1：直送路径，需要装箱明细。2：集货路径
  - **supplierWarehouseList** `object[]` — 商家仓库
    - **supplierWarehouseId** `int64` — 商家仓库id
    - **warehouseName** `string` — 仓库名称
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi.sheincorp.cn/open-api/shipping/basic?orderType=1' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'Content-Type: application/json;charset=UTF-8' \
--header 'x-lt-timestamp: 1752570464986' \
--data-raw ''
```

### 响应示例

```text
{
    "code": "0",
    "msg": "OK",
    "info": {
        "deliveryTypeList": [
            {
                "deliveryTypeName": "快递/物流送货",
                "deliveryTypeValue": 1
            },
            {
                "deliveryTypeName": "送货上门",
                "deliveryTypeValue": 2
            },
            {
                "deliveryTypeName": "定点收货",
                "deliveryTypeValue": 3
            },
            {
                "deliveryTypeName": "新增发货方式",
                "deliveryTypeValue": 4
            },
            {
                "deliveryTypeName": "上门查货",
                "deliveryTypeValue": 21
            },
            {
                "deliveryTypeName": "送货上门",
                "deliveryTypeValue": 10
            }
        ],
        "addressList": [
            {
                "addressName": "河南地址",
                "addressId": 4722
            },
            {
                "addressName": "青羊地址",
                "addressId": 4721
            },
            {
                "addressName": "宝鸡",
                "addressId": 4720
            }
        ],
        "supplierWarehouseList": [
            {
                "warehouseName": "323432",
                "supplierWarehouseId": 78377
            },
            {
                "warehouseName": "仓库kkiki",
                "supplierWarehouseId": 78376
            },
            {
                "warehouseName": "总仓",
                "supplierWarehouseId": 78359
            }
        ],
        "expressCompanyList": [
            {
                "companyName": "提前我认为其他完全放弃",
                "companyCode": "afasfsag",
                "isSupport": true
            },
            {
                "companyName": "车门",
                "companyCode": "chemen",
                "isSupport": true
            },
            {
                "companyName": "dhl",
                "companyCode": "dhl",
                "isSupport": false
            },
            {
                "companyName": "fedex",
                "companyCode
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001981。