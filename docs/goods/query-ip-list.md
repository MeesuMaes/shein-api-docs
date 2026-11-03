# 查询可用IP列表

`POST /open-api/goods/query-ip-list`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-07-02 21:01:10 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001901](https://open.sheincorp.com/documents/apidoc/detail/3001901)

## 接口说明

获取店铺可用的IP数据。此接口的数据可使用在商品发布接口的入参"ip_character_list"。
IP指米老鼠这里IP形象，当商品涉及IP（例如联名款）时才会使用到此数据。商家可用的IP需要先提供授权证明等材料才可使用。

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-signature** `string` **必填** — 接口签名
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000

## 请求参数

- **pageSize** `integer` **必填** — 每页数量，每页最大数量为200 例: `200`
- **idMax** `bigint` **必填** — 上次查询结果中返回的最大的id，idMax。首次查询请输入0。 例: `0`

## 响应参数

- **code** `string` — 响应编码。响应成功：0 例: `0`
- **msg** `string` — 响应信息,成功：OK 例: `OK`
- **info** `object` — 数据信息
  - **count** `integer` **必填** — 查询结果的总数 例: `3`
  - **idMax** `integer` **必填** — 本次查询结果中的最大id 例: `112095`
  - **list** `object[]` — 商家可用的IP列表
    - **id** `bigint` — 商家和IP关系的数据键值。ERP不用关注业务意义，主要作为查询标的。 例: `112093`
    - **merchantExternalId** `bigint` — 商家ID 例: `38109363`
    - **ipId** `bigint` — IP的id值。此值会使用在商品发布接口的"ip_character_list" - "ip_id"。 例: `39425`
    - **ipName** `string` — IP的英文名称 例: `ip迪士尼`
    - **ipNameCn** `string` — IP的中文名称 例: `ipdishini`
    - **ipGroupId** `bigint` — IP归属组的组ID。 例如IP米老鼠归属于IP组迪士尼。 例: `258`
    - **ipGroupName** `string` — IP组名称 例: `迪士尼ip`
- **traceId** `string` — 追踪ID 例: `70b63a844e39d54c`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods/query-ip-list' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1766633364428' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "pageSize":200,
    "idMax":0
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "count": 1,
    "idMax": 112093,
    "list": [
      {
        "id": 112093,
        "merchantExternalId": 38109363,
        "merchantSource": 10,
        "ipId": 39425,
        "ipName": "Mickey Mouse",
        "ipNameCn": "米老鼠",
        "ipGroupId": 258,
        "ipGroupName": "迪士尼"
      }
    ]
  },
  "bbl": null,
  "traceId": "6d6a201432ebcf87"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001901。