# 查询警告语证书的填写规则

`POST /open-api/goods-compliance/query-warning-certificate-rules`

**QPS**：40 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v3 ｜ **更新时间**：2026-06-29 19:40:05 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001857](https://open.sheincorp.com/documents/apidoc/detail/3001857)

## 接口说明

此接口可获取所有需商家手动操作的警告语证书填写规则。详细信息可参考解决方案。

## 请求头

- **Content-Type** `string` — application/json
- **x-lt-openKeyId** `string` — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` — 接口签名
- **language** `string` — 响应msg的语种。不传时默认为英语，枚举值支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 响应参数

- **code** `string` — 响应码。 例: `0`
- **msg** `string` — 响应信息。 例: `OK`
- **info** `object[]` — 具体信息。 规则数据的使用方式，请查看解决方案
  - **certificateTypeId** `int64` — 证书类型ID 例: `754`
  - **certificateTypeCode** `string` — 证书类型Code，唯一编码。后续查询、更新SKC警告语时均会使用。 例: `PlaypenWMWAttr`
  - **certificateTypeName** `string` — 证书类型名称 例: `Game Bed Warning`
  - **presetInfo** `object` — 证书字段信息
    - **isEnabled** `integer` — 字段信息是否启用。0-禁用；1-启用 例: `1`
    - **presetFields** `object[]` **必填** — 字段详情
      - **fieldCode** `string` — 字段Code，唯一编码。 例: `PAWA1`
      - **fieldName** `string` — 字段名称，支持返回多语言。 例: `商品属性`
      - **fieldType** `integer` — 字段值的输入方式。 0=多选;1=单选;2=手动输入（实际上还是多选） 例: `0`
      - **fieldSort** `integer` — 字段排序。 重要：排序值最大的字段是警告语字段，其他的均为常规字段。警告语字段、常规字段的处理逻辑不同。 例: `0`
      - **isEnabled** `integer` — 字段是否启用。0-禁用；1-启用 例: `1`
      - **presetFieldValues** `object[]` **必填** — 字段值信息
        - **fieldValueId** `int64` — 字段值ID，唯一编码。 例: `2455`
        - **fieldValue** `string` — 字段值名称，支持返回多语言。 例: `产品是折叠游戏围栏`
        - **exclusionFieldValueIds** `int64[]` — 常规字段专用，互斥的字段值列表。 若常规字段值A下有互斥值B、C，则当商家选A时，BC均不能选。
        - **mappingPaths** `object[]` — 警告语字段专用，警告语组装规则
          - **fieldValueIds** `int64[]` — 警告语关联的常规字段值fieldValueId列表。 若警告语值a关联了常规字段值A、B，则当商家在常规字段中选了A或B中的任意值时，警告语字段中都需要传入a。
        - **valueSort** `integer` — 字段值排序 例: `0`
        - **isEnabled** `integer` — 字段值是否启用。0-禁用；1-启用 例: `1`
- **traceId** `string` — 追踪码 例: `465c0b253ba0211a`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-compliance/query-warning-certificate-rules' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1768893293204' \
--header 'language: CN' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "certificateTypeId": 754,
      "certificateTypeCode": "PlaypenWMWAttr",
      "certificateTypeName": "游戏床警告语",
      "presetInfo": {
        "isEnabled": 1,
        "presetFields": [
          {
            "fieldName": "商品属性",
            "fieldType": 0,
            "fieldCode": "PAWA1",
            "fieldSort": 0,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 2455,
                "fieldValue": "产品是折叠游戏围栏",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 2458,
                "fieldValue": "产品是游戏围栏，但不是折叠游戏围栏",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 1,
                "isEnabled": 1
              }
            ]
          },
          {
            "fieldName": "警告语",
            "fieldType": 2,
            "fieldCode": "WAContent",
            "fieldSort": 1,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 2457,
                "fieldValue": "警告：请勿将游戏围栏放置在明火或其他热源附近。",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      2455
                    ]
                  },
                  {
                    "fieldValueIds": [
                      2458
                    ]
                  }
                ],
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 2456,
                "fieldValue": "警告：请勿在没有底座的情况下使用游戏围栏。",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      2455
                    ]
                  },
                  {
                    "fieldValueIds": [
                      2458
                    ]
                  }
                ],
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 2454,
                "fieldValue": "警告：在将孩子放入本游戏围栏前，请确保围栏已完全搭建好，并且所有锁定装置均已正确锁定。",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      2455
                    ]
                  }
                ],
                "valueSort": 2,
                "isEnabled": 1
              }
            ]
          }
        ]
      }
    },
    {
      "certificateTypeId": 666,
      "certificateTypeCode": "PWarningAttr",
      "certificateTypeName": "安抚奶嘴及配件警告语-属性",
      "presetInfo": {
        "isEnabled": 1,
        "presetFields": [
          {
            "fieldName": "产品属性",
            "fieldType": 0,
            "fieldCode": "Product Attributes_1",
            "fieldSort": 0,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 479,
                "fieldValue": "产品是安抚奶嘴",
                "exclusionFieldValueIds": [
                  474,
                  480
                ],
                "mappingPaths": null,
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 474,
                "fieldValue": "产品既不是安抚奶嘴也不是奶嘴链",
                "exclusionFieldValueIds": [
                  479,
                  477,
                  480
                ],
                "mappingPaths": null,
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 477,
                "fieldValue": "有可拆卸的奶嘴保护盖",
                "exclusionFieldValueIds": [
                  474,
                  480
                ],
                "mappingPaths": null,
                "valueSort": 2,
                "isEnabled": 1
              },
              {
                "fieldValueId": 480,
                "fieldValue": "产品是安抚奶嘴链",
                "exclusionFieldValueIds": [
                  474,
                  479,
                  477
                ],
                "mappingPaths": null,
                "valueSort": 3,
                "isEnabled": 1
              }
            ]
          },
          {
            "fieldName": "商品详情页提示内容",
            "fieldType": 2,
            "fieldCode": "Toy_Danger_Warning",
            "fieldSort": 1,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 485,
                "fieldValue": "WARNING:Inspect carefully before each use. Pull the soother in all directions. Throw away at the first signs of damage or weakness.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      479
                    ]
                  }
                ],
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 484,
                "fieldValue": "WARNING:Only use dedicated soother holders tested to EN 12586. Never attach other ribbons or cords to a soother, your child may be strangled by them.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      479
                    ]
                  }
                ],
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 475,
                "fieldValue": "WARNING:Do not leave a soother in direct sunlight or near a source of heat, or leave in disinfectant (\"sterilising solution\") for longer than recommended, as this may weaken the teat.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      479
                    ]
                  }
                ],
                "valueSort": 2,
                "isEnabled": 1
              },
              {
                "fieldValueId": 482,
                "fieldValue": "C端透出内容为空",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      474
                    ]
                  }
                ],
                "valueSort": 3,
                "isEnabled": 1
              },
              {
                "fieldValueId": 483,
                "fieldValue": "WARNING:Keep the removable teat protector away from children to avoid suffocation.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      477
                    ]
                  }
                ],
                "valueSort": 4,
                "isEnabled": 1
              },
              {
                "fieldValueId": 476,
                "fieldValue": "WARNING:Before each use check the soother holder carefully. Throw away at the first sign of damage or weakness.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      480
                    ]
                  }
                ],
                "valueSort": 5,
                "isEnabled": 1
              },
              {
                "fieldValueId": 478,
                "fieldValue": "WARNING:Never lengthen the soother holder!",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      480
                    ]
                  }
                ],
                "valueSort": 6,
                "isEnabled": 1
              },
              {
                "fieldValueId": 481,
                "fieldValue": "WARNING:Never attach to cords, ribbons, laces or loose parts of clothing. The child can be strangled.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      480
                    ]
                  }
                ],
                "valueSort": 7,
                "isEnabled": 1
              }
            ]
          }
        ]
      }
    },
    {
      "certificateTypeId": 362,
      "certificateTypeCode": "111111",
      "certificateTypeName": "arms_skc维度卖点证书测试",
      "presetInfo": {
        "isEnabled": 1,
        "presetFields": [
          {
            "fieldName": "1",
            "fieldType": 0,
            "fieldCode": "PAWA1",
            "fieldSort": 0,
            "isEnabled": 1,
            "presetFieldValues": null
          },
          {
            "fieldName": "2",
            "fieldType": 0,
            "fieldCode": "WAContent",
            "fieldSort": 1,
            "isEnabled": 1,
            "presetFieldValues": null
          }
        ]
      }
    },
    {
      "certificateTypeId": 537,
      "certificateTypeCode": "BallWarnings",
      "certificateTypeName": "气球警告语",
      "presetInfo": {
        "isEnabled": 1,
        "presetFields": [
          {
            "fieldName": "气球产品危险性描述",
            "fieldType": 0,
            "fieldCode": "Ball_Warnings",
            "fieldSort": 0,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 447,
                "fieldValue": "警告：非儿童玩具",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 446,
                "fieldValue": "警告：天然乳胶材质",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 448,
                "fieldValue": "警告：窒息-未充气或破损气球引起的窒息",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 2,
                "isEnabled": 1
              },
              {
                "fieldValueId": 450,
                "fieldValue": "警告：窒息危险 - 含有小零件导致儿童误吞堵住气管引起的窒息。不适用于 3 岁以下儿童。",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 3,
                "isEnabled": 1
              },
              {
                "fieldValueId": 449,
                "fieldValue": "警告：使用充气泵",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 4,
                "isEnabled": 1
              }
            ]
          },
          {
            "fieldName": "商详页提示内容",
            "fieldType": 2,
            "fieldCode": "Toy_Danger_Warning",
            "fieldSort": 1,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 451,
                "fieldValue": "警告：非儿童玩具",
                "exclusionFieldValueIds": [
                  452
                ],
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      447
                    ]
                  }
                ],
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 452,
                "fieldValue": "警告：天然乳胶材质",
                "exclusionFieldValueIds": [
                  451
                ],
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      446
                    ]
                  }
                ],
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 453,
                "fieldValue": "警告：窒息-未充气或破损气球引起的窒息",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      448
                    ]
                  }
                ],
                "valueSort": 2,
                "isEnabled": 1
              },
              {
                "fieldValueId": 454,
                "fieldValue": "警告：窒息危险 - 含有小零件导致儿童误吞堵住气管引起的窒息。不适用于 3 岁以下儿童。",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      450
                    ]
                  }
                ],
                "valueSort": 3,
                "isEnabled": 1
              },
              {
                "fieldValueId": 455,
                "fieldValue": "警告：使用充气泵",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      449
                    ]
                  }
                ],
                "valueSort": 4,
                "isEnabled": 1
              }
            ]
          }
        ]
      }
    },
    {
      "certificateTypeId": 665,
      "certificateTypeCode": "FPWarningAttr",
      "certificateTypeName": "母婴喂养用品警告语-属性",
      "presetInfo": {
        "isEnabled": 1,
        "presetFields": [
          {
            "fieldName": "产品属性",
            "fieldType": 0,
            "fieldCode": "Product Attributes",
            "fieldSort": 0,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 459,
                "fieldValue": "产品带奶嘴",
                "exclusionFieldValueIds": [
                  473
                ],
                "mappingPaths": null,
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 461,
                "fieldValue": "玻璃容器",
                "exclusionFieldValueIds": [
                  473
                ],
                "mappingPaths": null,
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 473,
                "fieldValue": "不存在上述情形",
                "exclusionFieldValueIds": [
                  459,
                  461
                ],
                "mappingPaths": null,
                "valueSort": 2,
                "isEnabled": 1
              }
            ]
          },
          {
            "fieldName": "商详页提示内容",
            "fieldType": 2,
            "fieldCode": "Toy_Danger_Warning",
            "fieldSort": 1,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 458,
                "fieldValue": "警告：严禁将喂食奶嘴用作安抚奶嘴。",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      459
                    ]
                  }
                ],
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 460,
                "fieldValue": "警告：玻璃容器可能破裂。",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      461
                    ]
                  }
                ],
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 462,
                "fieldValue": "警告：使用本产品时须有成人监护。",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      459
                    ]
                  },
                  {
                    "fieldValueIds": [
                      461
                    ]
                  }
                ],
                "valueSort": 2,
                "isEnabled": 1
              },
              {
                "fieldValueId": 472,
                "fieldValue": "商家端不显示警告提示",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      473
                    ]
                  }
                ],
                "valueSort": 3,
                "isEnabled": 1
              }
            ]
          }
        ]
      }
    },
    {
      "certificateTypeId": 743,
      "certificateTypeCode": "Tem1",
      "certificateTypeName": "模版证书配置",
      "presetInfo": {
        "isEnabled": 1,
        "presetFields": [
          {
            "fieldName": "类型描述文案",
            "fieldType": 0,
            "fieldCode": "PAWA1",
            "fieldSort": 0,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 2380,
                "fieldValue": "类型1",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 2379,
                "fieldValue": "类型2",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 1,
                "isEnabled": 1
              }
            ]
          },
          {
            "fieldName": "模版一透出内容",
            "fieldType": 2,
            "fieldCode": "WAContent",
            "fieldSort": 1,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 2378,
                "fieldValue": "中文",
                "exclusionFieldValueIds": null,
                "mappingPaths": null,
                "valueSort": 0,
                "isEnabled": 1
              }
            ]
          }
        ]
      }
    },
    {
      "certificateTypeId": 671,
      "certificateTypeCode": "SWarningAttr",
      "certificateTypeName": "婴儿车警告语-属性",
      "presetInfo": {
        "isEnabled": 1,
        "presetFields": [
          {
            "fieldName": "婴儿车产品属性",
            "fieldType": 0,
            "fieldCode": "Product Attributes_3",
            "fieldSort": 0,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 527,
                "fieldValue": "卧式婴儿推车内部长度大于800 mm",
                "exclusionFieldValueIds": [
                  529
                ],
                "mappingPaths": null,
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 526,
                "fieldValue": "产品不适用于6个月以下的婴儿使用",
                "exclusionFieldValueIds": [
                  529
                ],
                "mappingPaths": null,
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 528,
                "fieldValue": "产品是坐式婴儿推车",
                "exclusionFieldValueIds": [
                  529
                ],
                "mappingPaths": null,
                "valueSort": 2,
                "isEnabled": 1
              },
              {
                "fieldValueId": 529,
                "fieldValue": "不存在上述情形",
                "exclusionFieldValueIds": [
                  527,
                  526,
                  528
                ],
                "mappingPaths": null,
                "valueSort": 3,
                "isEnabled": 1
              }
            ]
          },
          {
            "fieldName": "商品详情页展示警告语",
            "fieldType": 2,
            "fieldCode": "Toy_Danger_Warning",
            "fieldSort": 1,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 533,
                "fieldValue": "WARNING:Use a harness as soon as the child can sit unaided.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      527
                    ]
                  }
                ],
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 532,
                "fieldValue": "WARNING:This seat unit is not suitable for children under 6 months.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      526
                    ]
                  }
                ],
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 530,
                "fieldValue": "WARNING:Always use the restraint system.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      528
                    ]
                  }
                ],
                "valueSort": 2,
                "isEnabled": 1
              },
              {
                "fieldValueId": 531,
                "fieldValue": "没有警告语需要透出",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      529
                    ]
                  }
                ],
                "valueSort": 3,
                "isEnabled": 1
              }
            ]
          }
        ]
      }
    },
    {
      "certificateTypeId": 675,
      "certificateTypeCode": "BCSWarningAttr",
      "certificateTypeName": "自行车儿童座椅警告语-属性",
      "presetInfo": {
        "isEnabled": 1,
        "presetFields": [
          {
            "fieldName": "自行车儿童座椅产品属性",
            "fieldType": 0,
            "fieldCode": "Product Attributes_4",
            "fieldSort": 0,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 570,
                "fieldValue": "产品是设计为安装在载重等级为27公斤的行李架上的后置座椅",
                "exclusionFieldValueIds": [
                  569
                ],
                "mappingPaths": null,
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 569,
                "fieldValue": "产品是前置座椅",
                "exclusionFieldValueIds": [
                  570,
                  568
                ],
                "mappingPaths": null,
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 568,
                "fieldValue": "产品是装在行李架上的后置座椅",
                "exclusionFieldValueIds": [
                  569
                ],
                "mappingPaths": null,
                "valueSort": 2,
                "isEnabled": 1
              }
            ]
          },
          {
            "fieldName": "商品详情页提示内容",
            "fieldType": 2,
            "fieldCode": "Toy_Danger_Warning",
            "fieldSort": 1,
            "isEnabled": 1,
            "presetFieldValues": [
              {
                "fieldValueId": 571,
                "fieldValue": "WARNING: For safety reasons this seat shall only be fitted to luggage carriers conforming to EN IS0 11243:2016 marked with a 27 kg load capacity.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      570
                    ]
                  }
                ],
                "valueSort": 0,
                "isEnabled": 1
              },
              {
                "fieldValueId": 572,
                "fieldValue": "WARNING: Front seats reduce the manoeuvrability of the bicycle.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      569
                    ]
                  }
                ],
                "valueSort": 1,
                "isEnabled": 1
              },
              {
                "fieldValueId": 574,
                "fieldValue": "WARNING: The movability of the handle bar could be reduced by the seat.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      569
                    ]
                  }
                ],
                "valueSort": 2,
                "isEnabled": 1
              },
              {
                "fieldValueId": 573,
                "fieldValue": "WARNING: Additional security devices shall always be fastened.",
                "exclusionFieldValueIds": null,
                "mappingPaths": [
                  {
                    "fieldValueIds": [
                      568
                    ]
                  }
                ],
                "valueSort": 3,
                "isEnabled": 1
              }
            ]
          }
        ]
      }
    }
  ],
  "bbl": null,
  "traceId": "9e4e9684a292562f"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001857。