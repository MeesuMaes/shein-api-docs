# 查询加车结构信息

`POST /open-api/ccst/v1/custom-info/queryAddCartInfo`

**QPS**：50 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v8 ｜ **更新时间**：2026-04-07 20:40:56 ｜ **所属权限包**：[获取定制信息](/packages/customization) ｜ **官方文档**：[3001665](https://open.sheincorp.com/documents/apidoc/detail/3001665)

## 请求参数

- **customId** `string` **必填** — 定制搭建ID

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **data** `object`
  - **customInfo** `object` — 定制信息的具体内容
    - **preview** `object`
      - **effects** `string` — 预览图（产品形态与用户定制信息结合的图）
      - **images** `string[]` — 图片类型的定制信息
      - **texts** `string[]` — 文字类型的定制信息
    - **stores** `object[]`
      - **id** `string` — 存储项的唯一标识符
      - **key** `string` — 存储项的键
      - **label** `string` — 组建的label
      - **moduleType** `string` — 模块类型
      - **propertyName** `string` — 属性名称
      - **type** `string` — 数据类型
      - **value** `object` — 存储项的值
    - **customizerId** `string` — 定制搭建的id
    - **customizerVersion** `int64` — 定制搭建的版本
  - **id** `string` — 定制数据ID，用户定制数据的唯一标识符

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001665。