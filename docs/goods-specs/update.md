# 提交修改销售属性

`POST /open-api/goods-specs/update`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-10-26 11:40:42 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002077](https://open.sheincorp.com/documents/apidoc/detail/3002077)

## 接口说明

修改销售属性的表单构建较为复杂，请参考详细的解决方案，点击查看。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识openKeyId，获取方式请查阅：授权手册。
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为将当前时间转换为毫秒值，即从1970年1月1日起至今的毫秒数，例如：1583398764000。
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则。
- **language** `string` — 用于指定返回错误信息的语种，默认返回中文。支持的语言代码如下：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **size_attribute_list** `object[]` — 尺寸属性列表。覆盖逻辑，不传或传空代表清空尺码数据，若传值则需要传完整的尺码数据。
  - **attribute_extra_value** `string` **必填** — 尺寸属性值
  - **attribute_id** `int64` **必填** — 尺寸属性ID
  - **relate_sale_attribute_custom_attribute_value** `string` — 关联的次销售属性使用自定义销售属性值时，在此输入自定义销售属性值
  - **relate_sale_attribute_id** `int64` **必填** — 关联的次销售属性ID
  - **relate_sale_attribute_value_id** `int64` — 关联的次销售属性值ID，与 relate_sale_attribute_custom_attribute_value 二选一
- **skc_list** `object[]` **必填** — SKC列表，需提交SPU下当前所有的SKC，不可新增或删除SKC。 具体可修改的场景，详见解决方案
  - **sale_attribute** `object` **必填** — 主销售属性信息
    - **attribute_id** `int64` **必填** — 属性ID
    - **attribute_value_id** `int64` — 属性值ID，与 custom_attribute_value 二选一
    - **custom_attribute_value** `string` — 自定义属性值文本，与 attribute_value_id 二选一，最长50字符
    - **language** `string` — custom_attribute_value 的语种
  - **skc_name** `string` **必填** — SKC编码，即SHEIN平台编码
  - **sku_list** `object[]` **必填** — SKU列表，需提交SPU下当前所有的SKU，不可新增或删除SKU 具体可修改的场景，详见解决方案
    - **sale_attribute_list** `object[]` **必填** — 次销售属性列表，无次销售属性传空数组
      - **attribute_id** `int64` **必填** — 属性ID
      - **attribute_value_id** `int64` — 属性值ID，与 custom_attribute_value 二选一
      - **custom_attribute_value** `string` — 自定义属性值文本，与 attribute_value_id 二选一，最长100字符
      - **language** `string` — custom_attribute_value 的语种
    - **sku_code** `string` **必填** — SKU编码，SHEIN生成的编码
- **spu_name** `string` **必填** — SPU编码，SHEIN生成的编码

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object` — 提交修改销售属性响应
  - **flow_sn** `string` — 修改销售属性审核单号
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 追踪Id

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-specs/update' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1792047014592' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--header 'Connection: keep-alive' \
--data-raw '{
  "size_attribute_list": [
    {
      "attribute_extra_value": "10.2",
      "attribute_id": 55,
      "relate_sale_attribute_id": 87,
      "relate_sale_attribute_value_id": 474
    },
    {
      "attribute_extra_value": "19",
      "attribute_id": 2147484872,
      "relate_sale_attribute_id": 87,
      "relate_sale_attribute_value_id": 474
    },
    {
      "attribute_extra_value": "19",
      "attribute_id": 117,
      "relate_sale_attribute_id": 87,
      "relate_sale_attribute_value_id": 474
    }
  ],
  "skc_list": [
    {
      "sale_attribute": {
        "attribute_id": 1001184,
        "attribute_value_id": 635
      },
      "skc_name": "sH261011022533143473967",
      "sku_list": [
        {
          "sale_attribute_list": [
            {
              "attribute_id": 87,
              "attribute_value_id": 2147499130
            }
          ],
          "sku_code": "I1mv2q6966774ad9"
        },
        {
          "sale_attribute_list": [
            {
              "attribute_id": 87,
              "attribute_value_id": 474
            }
          ],
          "sku_code": "I5mv2q690pe90w2u"
        }
      ]
    }
  ],
  "spu_name": "r26040817083565606878"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": null,
  "bbl": null,
  "traceId": "c5beb845a70dc59f"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002077。