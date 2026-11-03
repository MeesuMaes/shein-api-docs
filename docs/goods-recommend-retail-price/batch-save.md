# 提交建议零售价

`POST /open-api/goods-recommend-retail-price/batch-save`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v3 ｜ **更新时间**：2026-07-02 20:38:59 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001895](https://open.sheincorp.com/documents/apidoc/detail/3001895)

## 接口说明

支持新增/更新商品的建议零售价，建议零售价发起新增/更新后，会进入审核流程。
注意：更新建议零售价是全量覆盖逻辑，请在提交时务必传入所有需要的信息，可以在更新前先查询商品当前的建议零售价信息，原数据会被清空。

## 请求头

- **x-lt-signature** `int64` **必填** — 接口签名
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **language** `string` — 响应msg的语种。不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **skc_rrp_list** `object[]` **必填** — SKC信息列表。单次最多同时提交10个SKC。 提交前请查询SKC的建议零售价填写规则：/open-api/goods/query-recommend-retail-price-rule 建议零售价的详细说明参考文档： https://open.sheincorp.com/documents/system/bf5a59ca-d378-4417-a359-f07cc89bf96b
  - **skc_name** `string` **必填** — SKC平台编码 例: `skc123456`
  - **sku_rrp_info_list** `object[]` **必填** — SKU信息列表。
    - **currency** `string` **必填** — 币种 例: `EUR`
    - **site** `string` — 站点缩写。 分站点规则下填写站点名，不分站点规则下不用写站点 例: `DE`
    - **sku_code** `string` **必填** — SKU平台编码 例: `sku123456`
    - **suggested_retail_price** `double` — 调整后的建议零售价，不填表示清空. 不同币种的精度要求不同，精度要求参考FAQ 例: `99.99`
    - **type_one_proof** `object` — 类型一证明材料
      - **attachments** `string[]` — 证明材料附件列表，图片或PDF的URL， 上传材料不能超过6个。 URL需要使用SHEIN链接，使用接口转换获取：/open-api/goods/discuss/upload-discuss-file
      - **proof_link** `string` — 网站地址，不超过1000个字符 例: `https://example.com/proof`
    - **type_two_proof** `object` — 类型二证明材料
      - **attachments** `string[]` — 证明材料附件列表，图片或PDF的URL， 上传材料不能超过6个。 URL需要使用SHEIN链接，使用接口转换获取：/open-api/goods/discuss/upload-discuss-file
      - **proof_link** `string` — 网站地址，不超过1000个字符 例: `https://example.com/proof`
  - **spu_name** `string` — SPU平台编码 例: `spu123456`

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object` — 响应信息
  - **failed_list** `object[]` — 失败列表。 提交操作是SKC维度，若SKC下有一个SKU提交信息不符合要求则会整体失败，失败信息会给到【SKU+站点】颗粒度。
    - **code** `string` — 失败错误码
    - **reason** `string` — 失败原因
    - **site** `string` — 站点代码
    - **skc_name** `string` — SKC平台编码
    - **sku_code** `string` — SKU平台编码
  - **success_list** `object[]` — 成功列表
    - **skc_name** `string` — SKC平台编码
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-recommend-retail-price/batch-save' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1780922139311' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "skc_rrp_list": [
    {
      "skc_name": "ss251029210602155831124",
      "sku_rrp_info_list": [
        {
          "currency": "EUR",
          "site": "shein-de",
          "sku_code": "I4mhc0fa93coyy",
          "suggested_retail_price": 99.99,
          "type_one_proof": {
            "attachments": [
              "https://ssmp-spmp-test.oss-cn-shenzhen.aliyuncs.com/dpas/proof/rrp/1779676397075uaobni4n.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<REDACTED>&X-Amz-Date=20260603T030009Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=<REDACTED>"
            ]
          }
        }
      ],
      "spu_name": "s2510292106021558"
    }
  ]
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "success_list": [],
    "failed_list": [
      {
        "code": "RRP003",
        "site": "shein-de",
        "skc_name": "ss251029210602155831124",
        "sku_code": "I4mhc0fa93coyy",
        "reason": "The current site does not support entering the suggested retail price. Please refresh and try again."
      }
    ]
  },
  "bbl": null,
  "traceId": "54b44feabd4113d1"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001895。