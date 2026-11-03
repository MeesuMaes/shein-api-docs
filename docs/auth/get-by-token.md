# 获取openKeyId和secretKey

`POST /open-api/auth/get-by-token`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / SHEIN自营 / 半托管 / POP ｜ **文档版本**：v31 ｜ **更新时间**：2025-12-26 14:35:50 ｜ **所属权限包**：[开发者接入](/packages/developer-access) ｜ **官方文档**：[3001520](https://open.sheincorp.com/documents/apidoc/detail/3001520)

## 接口说明

该API支持用tempToken交换openKeyId和secretKey，对接之前请查阅店铺授权开发者应用手册了解更全面的信息

## 请求头

- **x-lt-appid** `string` **必填** — 开发者appid，可登录查看
- **x-lt-timestamp** `string` **必填** — 时间戳（5分钟内有效）
- **x-lt-signature** `string` **必填** — 可查看签名规则，由于调用getbytoken接口时，开发者还没有openkeyId和secretKey，请使用appId和appSecretKey生成签名；
- **Content-Type** `string` **必填** — application/json;charset=UTF-8
- **language** `string` — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 支持传参： 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br 日语:ja

## 请求参数

- **tempToken** `string` **必填** — 商家账号登录确认授权返回的tempToken

## 响应参数

- **code** `string` **必填** — 响应码. 0:处理成功
- **msg** `string` — 响应描述
- **info** `object` — 响应内容
  - **secretKey** `string` **必填** — 卖家账号秘钥，需用开发者appSecretKey解密
  - **openKeyId** `string` **必填** — 卖家账号openKeyId
  - **appid** `string` **必填** — 开发者appId
  - **state** `string` — 原样返回的标识
  - **supplierId** `integer` **必填** — SHEIN商户ID
  - **supplierBusinessMode** `string` — 商家业务类型。只有特殊的商家此字段才会有值。 POP-US:美国POP店；POP-GLOBAL:跨境POP店；SFS:商家既要备货又要管理客单
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/auth/get-by-token' \
--header 'language: zh-cn' \
--header 'x-lt-appid: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752560461085' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "tempToken": "de723b1c-210b-4ecc-8da4-5f1da6ea0a9b"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "secretKey": "CQsi1eOAf****************YQqmG",
    "appid": "10AF15E7DD802804E7140BE2D326D",
    "openKeyId": "5C83782096BA46008D66C424CB39803F",
    "state": "OPENAPI",
    "supplierId": 21840925,
    "supplierSource": 10,
    "supplierBusinessMode": "POP-US"
  },
  "traceId": "7b0461d5534f3e1"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001520。