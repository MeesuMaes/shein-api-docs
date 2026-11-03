# 获取全量耗材类型和耗材材质信息

`POST /open-api/goods-quality/environmental-label-rule/material-quality-tree`

**QPS**：5 ｜ **合作模式**：全托管 / SHEIN自营 ｜ **文档版本**：v11 ｜ **更新时间**：2025-06-27 15:57:40 ｜ **所属权限包**：[商家服务-商品](/packages/merchant-goods) ｜ **官方文档**：[3001184](https://open.sheincorp.com/documents/apidoc/detail/3001184)

## 接口说明

该API支持获取全量耗材类型和耗材材质。
此接口会在2025年08月31日下线，请迁移使用新接口查询：/open-api/goods-quality/environmental-label-rule/material-quality-tree-v2

## 请求头

- **Content-Type** `string` **必填** — 默认值：application/json;charset=UTF-8
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 响应参数

- **bbl** `object` — 响应异常时的bbl相关信息
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — 响应编码 成功：0
- **info** `object`
  - **data** `object[]` — 结果
    - **materialQualityList** `object[]` — 耗材材质
      - **materialQualityId** `int64` — 耗材材质ID
      - **materialQualityName** `string` — 耗材材质名称
    - **materialTypeId** `int64` — 耗材类型ID
    - **materialTypeName** `string` — 耗材类型名称
  - **meta** `object` — 元数据
    - **count** `integer` — 数据记录数
    - **customObj** `object` — 用户自定义扩展
- **msg** `string` — 错误描述,成功：OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods-quality/environmental-label-rule/material-quality-tree' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751010974975' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "data": [
      {
        "materialTypeId": 240111343,
        "materialTypeName": "保护性包装",
        "materialQualityList": [
          {
            "materialQualityId": 240111360,
            "materialQualityName": "低密度聚乙烯"
          },
          {
            "materialQualityId": 240111361,
            "materialQualityName": "聚丙烯"
          },
          {
            "materialQualityId": 240111359,
            "materialQualityName": "聚氯乙烯"
          },
          {
            "materialQualityId": 240111357,
            "materialQualityName": "聚对苯二甲酸乙二醇酯"
          },
          {
            "materialQualityId": 240112071,
            "materialQualityName": "聚苯乙烯PS"
          }
        ]
      },
      {
        "materialTypeId": 240111342,
        "materialTypeName": "塑料袋",
        "materialQualityList": [
          {
            "materialQualityId": 240111357,
            "materialQualityName": "聚对苯二甲酸乙二醇酯"
          }
        ]
      },
      {
        "materialTypeId": 240111341,
        "materialTypeName": "贴纸",
        "materialQualityList": [
          {
            "materialQualityId": 240111360,
            "materialQualityName": "低密度聚乙烯"
          }
        ]
      },
      {
        "materialTypeId": 240111340,
        "materialTypeName": "外盒",
        "materialQualityList": [
          {
            "materialQualityId": 240111360,
            "materialQualityName": "低密度聚乙烯"
          }
        ]
      },
      {
        "materialTypeId": 240111339,
        "materialTypeName": "卫生贴",
        "materialQualityList": [
          {
            "materialQualityId": 240111361,
            "materialQualityName": "聚丙烯"
          },
          {
            "materialQualityId": 240111360,
            "materialQualityName": "低密度聚乙烯"
          }
        ]
      },
      {
        "materialTypeId": 240111338,
        "materialTypeName": "吊牌",
        "materialQualityList": [
          {
            "materialQualityId": 240111359,
            "materialQualityName": "聚氯乙烯"
          },
          {
            "materialQualityId": 240111361,
            "materialQualityName": "聚丙烯"
          }
        ]
      },
      {
        "materialTypeId": 240111337,
        "materialTypeName": "纸",
        "materialQualityList": [
          {
            "materialQualityId": 240111359,
            "materialQualityName": "聚氯乙烯"
          },
          {
            "materialQualityId": 240111360,
            "materialQualityName": "低密度聚乙烯"
          },
          {
            "materialQualityId": 240111361,
            "materialQualityName": "聚丙烯"
          }
        ]
      },
      {
        "materialTypeId": 240111336,
        "materialTypeName": "环保袋",
        "materialQualityList": [
          {
            "materialQualityId": 240111360,
            "materialQualityName": "低密度聚乙烯"
          },
          {
            "materialQualityId": 240111357,
            "materialQualityName": "聚对苯二甲酸乙二醇酯"
          },
          {
            "materialQualityId": 240111361,
            "materialQualityName": "聚丙烯"
          }
        ]
      },
      {
        "materialTypeId": 240112070,
        "materialTypeName": "黑色玻璃瓶",
        "materialQualityList": [
          {
            "materialQualityId": 240112071,
            "materialQualityName": "聚苯乙烯PS"
          },
          {
            "materialQualityId": 240112068,
            "materialQualityName": "碳素钢"
          }
        ]
      },
      {
        "materialTypeId": 240111345,
        "materialTypeName": "瓶子",
        "materialQualityList": [
          {
            "materialQualityId": 240111359,
            "materialQualityName": "聚氯乙烯"
          },
          {
            "materialQualityId": 240111357,
            "materialQualityName": "聚对苯二甲酸乙二醇酯"
          },
          {
            "materialQualityId": 240111358,
            "materialQualityName": "高密度聚乙烯"
          },
          {
            "materialQualityId": 240111361,
            "materialQualityName": "聚丙烯"
          },
          {
            "materialQualityId": 240112068,
            "materialQualityName": "碳素钢"
          }
        ]
      },
      {
        "materialTypeId": 240111344,
        "materialTypeName": "内部外壳",
        "materialQualityList": [
          {
            "materialQualityId": 240111357,
            "materialQualityName": "聚对苯二甲酸乙二醇酯"
          },
          {
            "materialQualityId": 240111361,
            "materialQualityName": "聚丙烯"
          }
        ]
      }
    ],
    "meta": {
      "count": 11,
      "customObj": null
    }
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001184。