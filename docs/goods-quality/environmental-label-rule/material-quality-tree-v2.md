# 获取全量环保耗材信息

`GET /open-api/goods-quality/environmental-label-rule/material-quality-tree-v2`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v6 ｜ **更新时间**：2026-07-02 21:02:51 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001902](https://open.sheincorp.com/documents/apidoc/detail/3001902)

## 接口说明

商品若要打印环保标，需先通过此接口获取平台支持的环保材料信息。
环保材料信息共有两层，材料类型 -> 具体材料。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名。
- **language** `string` **必填** — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 响应参数

- **code** `string`
- **msg** `string`
- **info** `object[]` **必填**
  - **packageTypeId** `integer` — 环保材料类型ID
  - **packageTypeName** `string` — 环保材料类型名称
  - **isEnabled** `integer` — 环保材料类型是否可用
  - **packageMaterials** `object[]` **必填** — 某个环保材料类型下的具体环保材料信息
    - **packageMaterialId** `integer` — 环保材料ID
    - **packageMaterialName** `string` — 环保材料名称
    - **isEnabled** `integer` — 环保材料是否可用
- **traceId** `string` — 请求追踪ID

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request GET 'https://openapi.sheincorp.com//open-api/goods-quality/environmental-label-rule/material-quality-tree-v2' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1751007419290' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "packageTypeId": 6,
      "packageTypeName": "塑料袋",
      "isEnabled": 1,
      "packageMaterials": [
        {
          "packageMaterialId": 62,
          "packageMaterialName": "PVC塑料袋",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 66,
          "packageMaterialName": "PE塑料袋LDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 61,
          "packageMaterialName": "PE塑料袋HDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 63,
          "packageMaterialName": "PET塑料袋",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 60,
          "packageMaterialName": "PP塑料袋",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 65,
          "packageMaterialName": "PS塑料袋",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 64,
          "packageMaterialName": "其他塑料袋",
          "isEnabled": 1
        }
      ]
    },
    {
      "packageTypeId": 7,
      "packageTypeName": "包装盒",
      "isEnabled": 1,
      "packageMaterials": [
        {
          "packageMaterialId": 67,
          "packageMaterialName": "PVC塑料盒",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 72,
          "packageMaterialName": "PE塑料盒LDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 71,
          "packageMaterialName": "PE塑料盒HDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 74,
          "packageMaterialName": "PET塑料盒",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 73,
          "packageMaterialName": "PP塑料盒",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 70,
          "packageMaterialName": "PS塑料盒",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 69,
          "packageMaterialName": "其他塑料盒",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 68,
          "packageMaterialName": "瓦楞纸盒",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 98,
          "packageMaterialName": "非瓦楞纸盒",
          "isEnabled": 1
        }
      ]
    },
    {
      "packageTypeId": 8,
      "packageTypeName": "瓶子",
      "isEnabled": 1,
      "packageMaterials": [
        {
          "packageMaterialId": 79,
          "packageMaterialName": "PVC塑料瓶",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 81,
          "packageMaterialName": "PE塑料瓶LDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 75,
          "packageMaterialName": "PE塑料瓶HDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 78,
          "packageMaterialName": "PET塑料瓶",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 80,
          "packageMaterialName": "PP塑料瓶",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 76,
          "packageMaterialName": "PS塑料瓶",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 77,
          "packageMaterialName": "其他塑料瓶",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 97,
          "packageMaterialName": "透明玻璃",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 101,
          "packageMaterialName": "绿玻璃",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 106,
          "packageMaterialName": "棕色玻璃",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 107,
          "packageMaterialName": "有色（非绿/非棕）玻璃",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 99,
          "packageMaterialName": "钢铁",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 108,
          "packageMaterialName": "铝",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 105,
          "packageMaterialName": "其他金属（非钢铁非铝）",
          "isEnabled": 1
        }
      ]
    },
    {
      "packageTypeId": 9,
      "packageTypeName": "盖子",
      "isEnabled": 1,
      "packageMaterials": [
        {
          "packageMaterialId": 91,
          "packageMaterialName": "PVC塑料盖子",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 87,
          "packageMaterialName": "PE塑料盖子LDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 94,
          "packageMaterialName": "PE塑料盖子HDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 88,
          "packageMaterialName": "PET塑料盖子",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 85,
          "packageMaterialName": "PP塑料盖子",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 84,
          "packageMaterialName": "PS塑料盖子",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 83,
          "packageMaterialName": "其他塑料盖子",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 109,
          "packageMaterialName": "钢铁",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 104,
          "packageMaterialName": "铝",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 103,
          "packageMaterialName": "其他金属（非钢铁非铝）",
          "isEnabled": 1
        }
      ]
    },
    {
      "packageTypeId": 10,
      "packageTypeName": "泡沫板",
      "isEnabled": 1,
      "packageMaterials": [
        {
          "packageMaterialId": 95,
          "packageMaterialName": "PVC塑料板",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 93,
          "packageMaterialName": "PE塑料板LDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 86,
          "packageMaterialName": "PE塑料板HDPE",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 82,
          "packageMaterialName": "PET塑料板",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 90,
          "packageMaterialName": "PP塑料板",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 92,
          "packageMaterialName": "PS塑料板",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 89,
          "packageMaterialName": "其他塑料板",
          "isEnabled": 1
        }
      ]
    },
    {
      "packageTypeId": 11,
      "packageTypeName": "纸板",
      "isEnabled": 1,
      "packageMaterials": [
        {
          "packageMaterialId": 102,
          "packageMaterialName": "瓦楞纸板",
          "isEnabled": 1
        },
        {
          "packageMaterialId": 100,
          "packageMaterialName": "非瓦楞纸板",
          "isEnabled": 1
        }
      ]
    },
    {
      "packageTypeId": 12,
      "packageTypeName": "纸",
      "isEnabled": 1,
      "packageMaterials": [
        {
          "packageMaterialId": 96,
          "packageMaterialName": "纸",
          "isEnabled": 1
        }
      ]
    }
  ],
  "traceId": "4e6ef5f4cb1b5a4"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001902。