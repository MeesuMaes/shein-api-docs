# 查询商家退货地址

`POST /open-api/purchase/query-return-address`

**QPS**：50 ｜ **合作模式**：全托管 ｜ **文档版本**：v5 ｜ **更新时间**：2026-06-12 10:36:33 ｜ **所属权限包**：[采购单退货解决方案](/packages/purchase-return) ｜ **官方文档**：[3001803](https://open.sheincorp.com/documents/apidoc/detail/3001803)

## 接口说明

获取商家可用的退货收货地址列表

## 请求头

- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **addressIdList** `integer[]` — 卖家地址唯一ID集合,如果入参此ID 列表不为空，只会返回此ID列表中所有 id 对应的地址明细 例: `43`
- **filterSharedAddress** `boolean` — 是否过滤共享地址 true:过滤 false:不过滤(默认不过滤)；开发者可忽略 例: `false`
- **fuzzyQuery** `string` — 模糊搜索,地址简称、手机区号和联系人的全模糊搜索 例: `random_fuzzyQuery`
- **orderBySharedAddress** `boolean` — 是否按商群共享地址排序，当入参该值并且是true时，会把共享地址排在前面,如果不传按默认排序；开发者可忽略 例: `false`
- **pageNum** `integer` — 页码,默认第一页 例: `7`
- **pageSize** `integer` — 每页条数,默认10条 例: `79`
- **serviceSiteCodeList** `string[]` — VSS增值系统提供的服务点ID集合,1、VSS增值系统提供的服务点ID 2、如果入参此ID，只会返回此ID对应的地址明细（不区分服务点启用or禁用状态）；开发者可忽略 例: `random_serviceSiteCodeList`

## 响应参数

- **code** `string` **必填** — 响应编码，成功：0 例: `random_code`
- **msg** `string` — 错误描述,成功：OK 例: `random_msg`
- **traceId** `string` **必填** — 请求的唯一标识；用于异常报错跟踪
- **info** `object` **必填**
  - **data** `object[]` **必填**
    - **address1** `string` — 地址1(国内和国外商家使用的地址) 例: `random_address1`
    - **address2** `string` — 地址2(国外商家使用的地址，地址1和地址2进行拼接使用) 例: `random_address2`
    - **addressAbnormal** `integer` — 地址异常情况：1-已处理 2-待处理 例: `26`
    - **addressDetail** `string` — 拼接后的地址详情 例: `random_addressDetail`
    - **addressId** `integer` — 物流客户地址唯一ID 例: `6`
    - **addressLabel** `string` — 地址标签 例: `random_addressLabel`
    - **cityId** `integer` — 城市id 例: `54`
    - **cityName** `string` — 城市名称 例: `random_cityName`
    - **countryCode** `string` — 国家二字码 例: `random_countryCode`
    - **countryId** `integer` — 国家ID 例: `18`
    - **countryName** `string` — 国家名称 例: `random_countryName`
    - **districtId** `integer` — 地区id 例: `87`
    - **districtName** `string` — 地区名称 例: `random_districtName`
    - **isDefaultAddress** `integer` — 是否默认发货地址1：是；2否 例: `91`
    - **isDefaultPickupAddress** `integer` — 是否默认收货地址1：是；2:否 例: `58`
    - **isDefaultReturnAddress** `integer` — 是否默认退货地址1：是；2:否 例: `93`
    - **isSharedAddress** `integer` — 是否商群共享地址1：是；2:否 例: `7`
    - **lastLevelAddressId** `integer` — 地址最末级ID 例: `83`
    - **merchantCode** `string` — 商家全球唯一编码 例: `random_merchantCode`
    - **phoneAreaCode** `string` — 手机区号 例: `random_phoneAreaCode`
    - **postCode** `string` — 邮编 例: `random_postCode`
    - **postcodeId** `integer` — 邮编ID 例: `47`
    - **sellerContract** `string` — 商家联系人 例: `random_sellerContract`
    - **sellerContractEmail** `string` — 商家联系人邮箱 例: `random_sellerContractEmail`
    - **sellerContractFirstName** `string` — 商家联系人-名 例: `random_sellerContractFirstName`
    - **sellerContractLastName** `string` — 商家联系人-姓 例: `random_sellerContractLastName`
    - **sellerContractPhone** `string` — 商家联系人电话 例: `random_sellerContractPhone`
    - **sellerId** `integer` — 商家ID,供应商外部id 例: `9`
    - **sellerSiteNo** `string` — 服务站点编码 例: `random_sellerSiteNo`
    - **snapshotVersion** `string` — 地址最新版本号（按照版本号查询的时候返回的是入参的版本号) 例: `random_snapshotVersion`
    - **stateId** `integer` — 州省id 例: `82`
    - **stateName** `string` — 州省名称 例: `random_stateName`
    - **streetId** `integer` — 街道id 例: `43`
    - **streetName** `string` — 街道名称 例: `random_streetName`
    - **supplierType** `integer` — 商家类型采购：1-生产；2-增值；6-平台 例: `13`
  - **meta** `object` **必填**
    - **count** `integer` 例: `49`
    - **customObj** `object` **必填**

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.cn/open-api/purchase/query-return-address' \
--header 'language: en' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733442579' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "addressIdList": [
    
  ]

}'
```

### 响应示例

```text
{
    "code": "0",
    "msg": "OK",
    "info": {
        "data": [
            {
                "addressId": 20650,
                "sellerContract": "浙江 发货",
                "sellerContractPhone": "12344555667",
                "phoneAreaCode": "+86",
                "sellerContractEmail": "",
                "sellerSiteNo": "",
                "addressLabel": "浙江地址",
                "isDefaultAddress": 2,
                "isDefaultReturnAddress": 2,
                "isDefaultPickupAddress": 2,
                "countryId": 44,
                "countryName": "China",
                "countryCode": "CN",
                "stateId": 261464,
                "stateName": "浙江省",
                "cityId": 261627,
                "cityName": "丽水市",
                "districtId": 3006790,
                "districtName": "遂昌县",
                "streetId": 6611892,
                "streetName": "蔡源乡",
                "postcodeId": 0,
                "postCode": "",
                "address1": "三星大道115号",
                "address2": "",
                "addressDetail": "浙江省 丽水市 遂昌县 三星大道115号",
                "sellerContractLastName": "浙江",
                "sellerContractFirstName": "发货",
                "supplierType": 10,
                "sellerId": test,
                "merchantCode": "test",
                "addressAbnormal": 1,
                "lastLevelAddressId": 6611892,
                "snapshotVersion": "CLMS2602090001",
                "isSharedAddress": 2
            }
        ],
        "meta": {
            "count": 1,
            "customObj": {}
        }
    },
    "bbl": {},
    "traceId": "7a2fcc0007bc02e8"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001803。