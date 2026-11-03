# 查询是否可修改销售属性

`POST /open-api/goods-specs/check-modify-permission`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-10-26 10:36:09 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3002076](https://open.sheincorp.com/documents/apidoc/detail/3002076)

## 接口说明

商品发起修改销售属性，需要满足以下所有条件，可通过此接口判断商品是否满足要求。修改销售属性的整体解决方案，请点击查看文档。
1、非成衣、鞋类、胚衣/定制类商品
2、没有SHEIN仓库存，即SHEIN仓库存=0
3、没有审版通过 / 有实物核价记录
4、非复制商品（如搬家、托盘商场景下，被复制出来的商品）
5、商品当前不存在审核中的商品新增/编辑公文，也不可存在审核中的销售属性修改单
6、商品必须是已上新成功，即SPU一定有审核通过的公文

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识openKeyId，获取方式请查阅：授权手册。
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为将当前时间转换为毫秒值，即从1970年1月1日起至今的毫秒数，例如：1583398764000。
- **x-lt-signature** `string` **必填** — 请求签名，生成规则请查阅：签名规则。
- **language** `string` — 用于指定返回错误信息的语种，默认返回中文。支持的语言代码如下：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **spu_name** `string` **必填** — spuName，SHEIN平台的商品编码，必须是已经审核通过的SPU

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **info** `object` — 响应嘻嘻
  - **can_modify** `boolean` — 是否可以修改销售属性。true=可以修改；false=不可修改 例: `false`
  - **fail_reasons** `string[]` — 不可修改的原因列表。（can_modify=true 时为空数组，can_modify=false时有值）。可能存在多条原因，每条原因会根据header中的语种翻译为多语言。
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-specs/check-modify-permission' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test'' \
--header 'x-lt-timestamp: 1792660232013' \
--header 'language: en' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--header 'Connection: keep-alive' \
--data-raw '{
    "spu_name": "r2604081708306878"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "can_modify": true,
    "fail_reasons": []
  },
  "bbl": null,
  "traceId": "6211af6e9daaf6ae"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002076。