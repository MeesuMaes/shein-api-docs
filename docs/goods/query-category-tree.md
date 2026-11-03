# 店铺查商品末级分类

`POST /open-api/goods/query-category-tree`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v12 ｜ **更新时间**：2026-11-03 10:23:49 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001594](https://open.sheincorp.com/documents/apidoc/detail/3001594)

## 接口说明

该API支持查询店铺的商品末级分类信息，不同店铺，分类会有差异。

## 请求头

- **language** `string` **必填** — 支持返回的多语言报错信息，可用的语种：简体中文：zh-cn、英语：en、西班牙语：es、法语：fr、德语：de、意大利语：it、巴西葡萄牙语：pt-BR、葡萄牙葡萄牙语：pt-PT、波兰语：pl、土耳其语：tr、阿拉伯语：ar、韩语：ko、日语：ja、瑞典语：sv
- **Content-Type** `string` **必填**
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
- **code** `string` **必填** — Result(success: 0)
- **info** `object`
  - **data** `object[]`
    - **category_id** `int64` — 分类id
    - **category_name** `string` — 分类名称，建议开发者在系统界面显示该名称，便于运营选择类目
    - **children** `object[]` — 子分类列表
    - **last_category** `boolean` — 是否末级分类（true：末级分类，false：非末级分类） 例: `0`
    - **parent_category_id** `int64` — 上级分类id
    - **product_type_id** `int64` — 商品类型ID仅存在于末级分类中，用作商品发布接口的入参；通常一个分类ID对应一个商品类型ID
  - **meta** `object`
    - **count** `integer`
    - **customObj** `object`
- **msg** `string` — message
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/query-category-tree' \
--header 'language: en' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733442579' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw ''
```

### 响应示例

```text
{
    "code": "0",
    "msg": "OK",
    "info": {
        "data": [
            {
                "category_id": 2028,
                "product_type_id": 0,
                "parent_category_id": 0,
                "category_name": "女士",
                "last_category": false,
                "children": [
                    {
                        "category_id": 2033,
                        "product_type_id": 0,
                        "parent_category_id": 2028,
                        "category_name": "Clothing",
                        "last_category": false,
                        "children": [
                            {
                                "category_id": 1767,
                                "product_type_id": 0,
                                "parent_category_id": 2033,
                                "category_name": "Dresses中文",
                                "last_category": false,
                                "children": [
                                    {
                                        "category_id": 1727,
                                        "product_type_id": 1080,
                                        "parent_category_id": 1767,
                                        "category_name": "Dresses/中文-四级",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 1740,
                                        "product_type_id": 1080,
                                        "parent_category_id": 1767,
                                        "category_name": "长裤",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 1756,
                                        "product_type_id": 165,
                                        "parent_category_id": 1767,
                                        "category_name": "女士首饰套装",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 1757,
                                        "product_type_id": 80,
                                        "parent_category_id": 1767,
                                        "category_name": "耳环",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 1759,
                                        "product_type_id": 79,
                                        "parent_category_id": 1767,
                                        "category_name": "戒指",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 1777,
                                        "product_type_id": 91,
                                        "parent_category_id": 1767,
                                        "category_name": "女士胸针",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 1871,
                                        "product_type_id": 164,
                                        "parent_category_id": 1767,
                                        "category_name": "打底裤",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 1912,
                                        "product_type_id": 75,
                                        "parent_category_id": 1767,
                                        "category_name": "短裤",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 2157,
                                        "product_type_id": 1178,
                                        "parent_category_id": 1767,
                                        "category_name": "男士公文包",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 2209,
                                        "product_type_id": 367,
                                        "parent_category_id": 1767,
                                        "category_name": "Lakensets met kussenslopen",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 2336,
                                        "product_type_id": 1031,
                                        "parent_category_id": 1767,
                                        "category_name": "库尔塔套装",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 2709,
                                        "product_type_id": 571,
                                        "parent_category_id": 1767,
                                        "category_name": "Women Sweatpants",
                                        "last_category": true,
                                        "children": []
                                    },
                                    {
                                        "category_id": 10409,
                                        "product_type_id": 1080,
                                        "parent_category_id": 1767,
                                        "category_name": "非服装分类",
                                        "last_category": true,
                                        "children": []
                                    }
                                ]
                            },
{
                "category_id": 10011520,
                "product_type_id": 0,
                "parent_category_id": 0,
                "category_name": "分类1208",
                "last_category": false,
                "children": [
                    {
                        "category_id": 10011707,
                        "product_type_id": 2147485898,
                        "parent_category_id": 10011520,
                        "category_name": "测试二级分类111",
                        "last_category": true,
                        "children": []
                    },
                    {
                        "category_id": 10011712,
                        "product_type_id": 2147485901,
                        "parent_category_id": 10011520,
                        "category_name": "测试二级分类222",
                        "last_category": true,
                        "children": []
                    },
                    {
                        "category_id": 10011917,
                        "product_type_id": 2147486497,
                        "parent_category_id": 10011520,
                        "category_name": "测试4级分类C4",
                        "last_category": true,
                        "children": []
                    },
                    {
                        "category_id": 10011918,
                        "product_type_id": 2147486498,
                        "parent_category_id": 10011520,
                        "category_name": "测试2级分类2",
                        "last_category": true,
                        "children": []
                    }
                ]
            }
        ],
        "meta": {
            "count": 47,
            "customObj": null
        }
    },
    "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002092。