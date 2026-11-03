# 查询建议零售价审核记录

`POST /open-api/goods-recommend-retail-price-audit/search`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-07-02 20:33:41 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001890](https://open.sheincorp.com/documents/apidoc/detail/3001890)

## 接口说明

建议零售价的审核记录明细。

## 请求头

- **x-lt-signature** `int64` **必填** — 接口签名
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **language** `string` — 响应msg的语种。不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **audit_state_list** `integer[]` — 审核状态列表。1: 待审核 2: 审核成功 3: 审核失败 5: 部分通过 6: 已撤回 5: 部分通过，说明SKC下有部分SKU已审核通过，获得有效期。
- **page_num** `integer` **必填** — 页码 例: `1`
- **page_size** `integer` **必填** — 每页大小，单页最大100 例: `20`
- **skc** `string` — SKC平台编码 例: `skc123456`
- **spu** `string` — SPU平台编码 例: `spu123456`

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object` — 响应信息
  - **data** `object[]` — 列表信息
    - **spu_name** `string` — SPU平台编码
    - **skc_name** `string` — SKC平台编码
    - **submit_time** `datetime` — 提交时间
    - **audit_time** `datetime` — 审核时间
    - **audit_state** `integer` — 审核状态 1: 待审核 2: 审核成功 3: 审核失败 5: 部分通过 6: 已撤回
    - **audit_reason** `string` — 驳回原因
    - **change_sn** `string` — 调价单号
    - **creator** `string` — 申请人
    - **sale_attribute_value** `string` — SKC属性值
    - **sku_rrp_info_list** `object[]` — SKU信息列表
      - **sku_code** `string` — SKU平台编码
      - **site** `string` — 站点。站点=其它站点，代表是不按站点提供的SKU建议零售价；站点=某个具体站点，例如shein-fr，代表是站点维度的建议零售价。
      - **currency** `string` — 币种缩写
      - **suggested_retail_price** `double` — 修改后的建议零售价
      - **before_suggested_retail_price** `double` — 修改前的建议零售价
      - **type_one_proof** `object` — 证明材料信息
        - **attachments** `string[]` — 证明材料附件列表
        - **proof_link** `string` — 证明链接
      - **type_two_proof** `object` — 证明材料信息
        - **attachments** `string[]` — 证明材料附件列表
        - **proof_link** `string` — 证明链接
      - **audit_state** `integer` — SKU审核状态 1:待审核;2:审核成功 3:审核失败 6: 已撤回
      - **audit_reason** `string` — 驳回原因
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-recommend-retail-price-audit/search' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1780923627168' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{

"page_num":1,
"page_size":10,
"audit_state_list":[1,2,3]

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
        "creator": "SPAE",
        "skc_name": "ss260608113514842493722",
        "sale_attribute_value": "杏色",
        "spu_name": "s2606081135148424",
        "change_sn": "RRP260608177343496195",
        "audit_time": null,
        "audit_state": 1,
        "submit_time": "2026-06-08 11:44:42",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "shein-de",
            "currency": "EUR",
            "sku_code": "I8mq4o1r9ezhqk",
            "audit_state": 1,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [
                "https://ssmp-spmp-test.oss-cn-shenzhen.aliyuncs.com/dpas/proof/rrp/1780890181593lyp0fzki.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<REDACTED>&X-Amz-Date=20260608T130409Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=<REDACTED>"
              ],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 23,
            "before_suggested_retail_price": null
          },
          {
            "site": "shein-fr",
            "currency": "EUR",
            "sku_code": "I8mq4o1r9ezhqk",
            "audit_state": 1,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [
                "https://ssmp-spmp-test.oss-cn-shenzhen.aliyuncs.com/dpas/proof/rrp/1780890181593lyp0fzki.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<REDACTED>&X-Amz-Date=20260608T130409Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=<REDACTED>"
              ],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 23,
            "before_suggested_retail_price": null
          },
          {
            "site": "shein-it",
            "currency": "EUR",
            "sku_code": "I8mq4o1r9ezhqk",
            "audit_state": 1,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [
                "https://ssmp-spmp-test.oss-cn-shenzhen.aliyuncs.com/dpas/proof/rrp/1780890181593lyp0fzki.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<REDACTED>&X-Amz-Date=20260608T130409Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=<REDACTED>"
              ],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 23,
            "before_suggested_retail_price": null
          }
        ]
      },
      {
        "creator": "SPAE",
        "skc_name": "ss260608113514842493722",
        "sale_attribute_value": "杏色",
        "spu_name": "s2606081135148424",
        "change_sn": "RRP260608177343496196",
        "audit_time": "2026-06-08 11:44:41",
        "audit_state": 2,
        "submit_time": "2026-06-08 11:44:42",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I8mq4o1r9ezhqk",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 23,
            "before_suggested_retail_price": null
          },
          {
            "site": "shein-es",
            "currency": "EUR",
            "sku_code": "I8mq4o1r9ezhqk",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [
                "https://ssmp-spmp-test.oss-cn-shenzhen.aliyuncs.com/dpas/proof/rrp/1780890181593lyp0fzki.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<REDACTED>&X-Amz-Date=20260608T130409Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=<REDACTED>"
              ],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 23,
            "before_suggested_retail_price": null
          },
          {
            "site": "shein-us",
            "currency": "USD",
            "sku_code": "I8mq4o1r9ezhqk",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [
                "https://ssmp-spmp-test.oss-cn-shenzhen.aliyuncs.com/dpas/proof/rrp/1780890181593lyp0fzki.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<REDACTED>&X-Amz-Date=20260608T130409Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=<REDACTED>"
              ],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 23,
            "before_suggested_retail_price": null
          }
        ]
      },
      {
        "creator": "OPENAPI",
        "skc_name": "sc260414201529947197009",
        "sale_attribute_value": "彩色",
        "spu_name": "c2604142015299471",
        "change_sn": "RRP260605202219831299",
        "audit_time": "2026-06-05 13:23:32",
        "audit_state": 2,
        "submit_time": "2026-06-05 13:23:33",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I1mnyl60zmz8jl",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 104,
            "before_suggested_retail_price": 103
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I2mnyl60zhxtyp",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 104,
            "before_suggested_retail_price": 103
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I9mnyl60zpu301",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 104,
            "before_suggested_retail_price": 103
          }
        ]
      },
      {
        "creator": "OPENAPI",
        "skc_name": "sc260414201529947197009",
        "sale_attribute_value": "彩色",
        "spu_name": "c2604142015299471",
        "change_sn": "RRP260602349661757441",
        "audit_time": "2026-06-02 23:09:25",
        "audit_state": 2,
        "submit_time": "2026-06-02 23:09:25",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I1mnyl60zmz8jl",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I2mnyl60zhxtyp",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I9mnyl60zpu301",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          }
        ]
      },
      {
        "creator": "OPENAPI",
        "skc_name": "sc260414201529947197009",
        "sale_attribute_value": "彩色",
        "spu_name": "c2604142015299471",
        "change_sn": "RRP260602349640785921",
        "audit_time": "2026-06-02 23:09:20",
        "audit_state": 2,
        "submit_time": "2026-06-02 23:09:21",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I1mnyl60zmz8jl",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I2mnyl60zhxtyp",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I9mnyl60zpu301",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          }
        ]
      },
      {
        "creator": "OPENAPI",
        "skc_name": "sc260414201529947197009",
        "sale_attribute_value": "彩色",
        "spu_name": "c2604142015299471",
        "change_sn": "RRP260602347082244097",
        "audit_time": "2026-06-02 22:59:10",
        "audit_state": 2,
        "submit_time": "2026-06-02 22:59:11",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I1mnyl60zmz8jl",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I2mnyl60zhxtyp",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I9mnyl60zpu301",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 103
          }
        ]
      },
      {
        "creator": "OPENAPI",
        "skc_name": "sc260414201529947197009",
        "sale_attribute_value": "彩色",
        "spu_name": "c2604142015299471",
        "change_sn": "RRP260602340295843841",
        "audit_time": "2026-06-02 22:32:12",
        "audit_state": 2,
        "submit_time": "2026-06-02 22:32:12",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I1mnyl60zmz8jl",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 102
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I2mnyl60zhxtyp",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 102
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I9mnyl60zpu301",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 103,
            "before_suggested_retail_price": 102
          }
        ]
      },
      {
        "creator": "OPENAPI",
        "skc_name": "sc260414201529947197009",
        "sale_attribute_value": "彩色",
        "spu_name": "c2604142015299471",
        "change_sn": "RRP260602339062718464",
        "audit_time": "2026-06-02 22:27:18",
        "audit_state": 2,
        "submit_time": "2026-06-02 22:27:18",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I1mnyl60zmz8jl",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I2mnyl60zhxtyp",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I9mnyl60zpu301",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          }
        ]
      },
      {
        "creator": "OPENAPI",
        "skc_name": "sc260414201529947197009",
        "sale_attribute_value": "彩色",
        "spu_name": "c2604142015299471",
        "change_sn": "RRP260602328774090754",
        "audit_time": "2026-06-02 21:46:25",
        "audit_state": 2,
        "submit_time": "2026-06-02 21:46:25",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I1mnyl60zmz8jl",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I2mnyl60zhxtyp",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I9mnyl60zpu301",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          }
        ]
      },
      {
        "creator": "OPENAPI",
        "skc_name": "sc260414201529947197009",
        "sale_attribute_value": "彩色",
        "spu_name": "c2604142015299471",
        "change_sn": "RRP260602328488878082",
        "audit_time": "2026-06-02 21:45:17",
        "audit_state": 2,
        "submit_time": "2026-06-02 21:45:17",
        "audit_reason": null,
        "sku_rrp_info_list": [
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I1mnyl60zmz8jl",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I2mnyl60zhxtyp",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          },
          {
            "site": "其它站点",
            "currency": "USD",
            "sku_code": "I9mnyl60zpu301",
            "audit_state": 2,
            "audit_reason": "",
            "type_one_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "type_two_proof": {
              "attachments": [],
              "proof_link": ""
            },
            "suggested_retail_price": 102,
            "before_suggested_retail_price": 102
          }
        ]
      }
    ],
    "meta": {
      "count": 475,
      "customObj": null
    }
  },
  "bbl": null,
  "traceId": "8fe982488f59f4a2"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001890。