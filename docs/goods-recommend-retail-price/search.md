# 查询商品建议零售价

`POST /open-api/goods-recommend-retail-price/search`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v3 ｜ **更新时间**：2026-07-02 20:37:27 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001893](https://open.sheincorp.com/documents/apidoc/detail/3001893)

## 接口说明

查询商品当前的建议零售价详情。
注意：更新建议零售价前，请一定要查询商品当前建议零售价信息，因为更新是全量覆盖逻辑，提交时必须提供所有想要的信息，原数据会清空，以最新更新信息为准。

## 请求头

- **x-lt-signature** `int64` **必填** — 接口签名
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **language** `string` — 响应msg的语种。不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **skc_name_list** `string[]` **必填** — SKC平台编码列表，单次最多支持查询100个SKC。

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object` — 响应信息
  - **skc_rrp_list** `object[]` — SKC列表
    - **skc_name** `string` — SKC平台编码
    - **status** `integer` — SKC的建议零售价状态。1-审核中 2-包含抽检失败 3-包含审核失败 4-生效中 5-即将过期 6-已过期失效 7-部分过期失效。 其中2、3、7指的是SKC下的部分SKU有对应的状态，失败的部分代表没有建议零售价，具体是哪些SKU失败，可以查询审核记录：/open-api/goods-recommend-retail-price-audit/search
    - **status_desc** `string` — 当前状态的说明文案。例如status=1，desc=当前skc内有sku的建议零售价正在审核中，不能进行修改
    - **start_effective_time** `int64` — SKC整体建议零售价的有效期开始时间(毫秒时间戳)
    - **end_effective_time** `int64` — SKC整体建议零售价的有效期结束时间(毫秒时间戳)
    - **last_update_time** `int64` — SKC整体建议零售价的最新更新时间(毫秒时间戳)
    - **sku_rrp_info_list** `object[]` — SKC下详细的SKU建议零售价信息列表
      - **sku_code** `string` **必填** — SKU平台编码 例: `SKU001`
      - **site_rrp_info_list** `object[]` — 站点维度建议零售价列表。一个SKU可能有多组数据。如果A站点是按站点维度提供的，则site有值，例如shein-fr；如果BCD三个站点是不按站点维度提供的，则site无值。
        - **site** `string` — 站点。若例如shein-fr。如果站点为空，则代表此组数据为不分站点的SKU维度建议零售价。 例: `us`
        - **currency** `string` — 币种。例如EUR 例: `USD`
        - **suggested_retail_price** `string` — 建议零售价 例: `19.99`
        - **end_effective_time** `int64` — 结束生效时间(毫秒时间戳) 例: `1741776000000`
        - **start_effective_time** `int64` — 开始生效时间(毫秒时间戳)。 例: `1739184000000`
        - **type_one_proof** `object` — 类型一证明材料信息
          - **attachments** `string[]` — 证明材料附件列表
          - **proof_link** `string` — 证明链接
        - **type_two_proof** `object` — 类型二证明材料信息
          - **attachments** `string[]` — 证明材料附件列表
          - **proof_link** `string` — 证明链接
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-recommend-retail-price/search' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1780919799256' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{

            "skc_name_list":["ss260525103285186567910"]

}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "skc_rrp_list": [
      {
        "skc_name": "ss260525103285186567910",
        "start_effective_time": null,
        "end_effective_time": null,
        "status": 1,
        "status_desc": "当前skc内有sku的建议零售价正在审核中，不能进行修改",
        "last_update_time": 1779676699000,
        "sku_rrp_info_list": [
          {
            "sku_code": "I4mpkle8ncr1zn",
            "site_rrp_info_list": [
              {
                "site": "shein-de",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": 1784860699000,
                "type_one_proof": null,
                "type_two_proof": null
              },
              {
                "site": "shein-fr",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": 1784860699000,
                "type_one_proof": null,
                "type_two_proof": null
              },
              {
                "site": "shein-it",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": 1784860699000,
                "type_one_proof": null,
                "type_two_proof": null
              },
              {
                "site": "shein-uk",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": 1784860699000,
                "type_one_proof": null,
                "type_two_proof": null
              },
              {
                "site": "shein-us",
                "currency": "USD",
                "suggested_retail_price": "99.00",
                "start_effective_time": 1779676699000,
                "end_effective_time": null,
                "type_one_proof": {
                  "attachments": [
                    "https://ssmp-spmp-test.oss-cn-shenzhen.aliyuncs.com/dpas/proof/rrp/1779676397075uaobni4n.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<REDACTED>&X-Amz-Date=20260608T115640Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=<REDACTED>"
                  ],
                  "proof_link": ""
                },
                "type_two_proof": {
                  "attachments": [],
                  "proof_link": ""
                }
              },
              {
                "site": "",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": null,
                "type_one_proof": null,
                "type_two_proof": null
              }
            ]
          },
          {
            "sku_code": "I7mpkle8nlab0v",
            "site_rrp_info_list": [
              {
                "site": "shein-de",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": 1784860699000,
                "type_one_proof": null,
                "type_two_proof": null
              },
              {
                "site": "shein-fr",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": 1784860699000,
                "type_one_proof": null,
                "type_two_proof": null
              },
              {
                "site": "shein-it",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": 1784860699000,
                "type_one_proof": null,
                "type_two_proof": null
              },
              {
                "site": "shein-uk",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": 1784860699000,
                "type_one_proof": null,
                "type_two_proof": null
              },
              {
                "site": "shein-us",
                "currency": "USD",
                "suggested_retail_price": "99.00",
                "start_effective_time": 1779676699000,
                "end_effective_time": null,
                "type_one_proof": {
                  "attachments": [
                    "https://ssmp-spmp-test.oss-cn-shenzhen.aliyuncs.com/dpas/proof/rrp/1779676397075uaobni4n.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<REDACTED>&X-Amz-Date=20260608T115640Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=<REDACTED>"
                  ],
                  "proof_link": ""
                },
                "type_two_proof": {
                  "attachments": [],
                  "proof_link": ""
                }
              },
              {
                "site": "",
                "currency": null,
                "suggested_retail_price": null,
                "start_effective_time": 1779676699000,
                "end_effective_time": null,
                "type_one_proof": null,
                "type_two_proof": null
              }
            ]
          }
        ]
      }
    ]
  },
  "bbl": null,
  "traceId": "c4a0fa09ff98b720"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001893。