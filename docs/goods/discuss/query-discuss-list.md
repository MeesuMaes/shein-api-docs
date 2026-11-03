# 获取议价单列表

`POST /open-api/goods/discuss/query-discuss-list`

**QPS**：10 ｜ **合作模式**：全托管 / 半托管 ｜ **文档版本**：v6 ｜ **更新时间**：2026-07-02 20:35:33 ｜ **所属权限包**：[议价单管理](/packages/negotiation) ｜ **官方文档**：[3001891](https://open.sheincorp.com/documents/apidoc/detail/3001891)

## 接口说明

支持获取商品成本价的议价单列表。
目前仅支持3种议价类型：新品议价、老品议价、新品核价复议

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-signature** `string` **必填** — 请求签名
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400
- **language** `string` **必填** — 语种。默认为中文。支持语种:英语:US 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **discussStatus** `integer` — 议价单状态,。 1:待商家确认 2:待平台审核 3:接受议价 4:不接受议价 5:议价终止-成功 6:议价终止-失败
- **pageNum** `integer` **必填** — 分页数量。建议从1开始查询 例: `10`
- **pageSize** `integer` **必填** — 分页内条数，单页最多200 例: `1`

## 响应参数

- **code** `string` — 响应码 例: `40908`
- **info** `object` **必填** — 响应详情
  - **count** `integer` — 查询结果条数 例: `26842`
  - **data** `object[]` **必填** — 具体数据。目前仅支持3种议价类型：新品议价、老品议价、新品核价复议
    - **allPicUrls** `string[]` — SKC的所有商品图片 例: `voluptas delectus nulla aperiam commodi qui labore quidem sapiente ut sint dicta`
    - **appealCount** `integer` — 议价单剩余可议价次数。（平台不允许对同一个SKC进行无限次议价行为，因此会有次数限制，当剩余次数为0时，议价单状态变为6终止-失败） 例: `49545`
    - **appealReason** `string` — 建议改价原因（平台侧写入的内容） 例: `eveniet consequatur quis repudiandae molestiae`
    - **discussSn** `string` — 议价单单号 例: `at esse ipsam expedita saepe sint quia eum ratione quia commodi sed atque facili`
    - **discussStatus** `integer` — 议价单状态。 1:待商家确认 2:待平台审核 3:接受议价 4:不接受议价 5:议价终止-成功 6:议价终止-失败 例: `1186`
    - **discussType** `integer` — 议价单类型。 0:新品议价 1:老品议价 3:新品核价复议 例: `16593`
    - **fileUploadList** `object[]` **必填** — 议价上传的辅助材料
      - **file_name** `string` — 原始文件名 例: `eligendi facilis autem ipsa est`
      - **object_key** `string` — 文件唯一key，需通过接口/open-api/goods/discuss/upload-discuss-file上传文件后获取 例: `dicta tempore tempore dolorem iusto nisi nihil incidunt aut quo ipsam harum assu`
      - **type** `integer` — 文件类型 1:图片 例: `54475`
      - **url** `string` — 文件url，需通过接口/open-api/goods/discuss/upload-discuss-file上传文件后获取 例: `nisi consectetur illo magni in doloribus voluptate rerum dolores ad ut et sed ni`
    - **isSizeSamePrice** `integer` — 是否限制所有尺码同价 1-是（代表SKC下所有SKU的价格需相同，即议价时也需要相同）；0 否 例: `15827`
    - **mainPicUrl** `string` — 商品主图地址 例: `qui rerum sit ea veritatis nihil soluta aperiam eum sed eligendi sint reiciendis`
    - **productTitle** `string` — 商品标题 例: `saepe neque aut dignissimos quibusdam ipsum amet aut corrupti nulla soluta iure `
    - **reason** `string` — 议价原因（商家侧输入的内容） 例: `consectetur est illo nulla expedita quam`
    - **saleAttributeValue** `string` — SKC销售属性值 例: `et totam velit sapiente quis dicta consequatur vel perferendis tempore omnis con`
    - **serialNumber** `integer` — 当前议价的轮次数 例: `49585`
    - **skcName** `string` — 平台的skc编码 例: `nihil sint laborum officiis dolor deserunt fugiat eius`
    - **skuCostPrices** `object[]` **必填** — sku成本价列表
      - **costPriceHistories** `object[]` **必填** — 商家的成本价报价记录
        - **costPrice** `double` — 成本价 例: `61390.05`
        - **currency** `string` — 币种 例: `quia saepe aut temporibus molestiae omnis assumenda`
        - **serialNumber** `integer` — 报价轮次数 例: `18175`
      - **latestCostPrice** `double` — 最近一次的商家报价价格。如果serialNumber=1即商家侧还没有发起过报价时，则此字段无数据。 例: `2245.66`
      - **saleAttributeValues** `string[]` — 次规格属性值 例: `sit atque dolores sint velit atque molestiae omnis repellat dolor magni ullam ex`
      - **skuCode** `string` — 平台的sku编码 例: `346`
      - **suggestCostCurrency** `string` — 平台的建议成本价币种 例: `magnam corporis eaque hic dolorum dolores veritatis facilis eum nihil vitae qui `
      - **suggestCostPrice** `double` — 平台的建议成本价 例: `56506.04`
    - **spuName** `string` — 平台的spu编码 例: `id fugit repellat dolorum error ipsa corporis`
    - **supplierCode** `string` — 商家的skc货号 例: `271`
- **msg** `string` — 响应信息 例: `modi expedita soluta et et ad consequatur tempora commodi consequatur aspernatur`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods/discuss/query-discuss-list' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1762494208230' \
--header 'language: US' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "discussStatus":"",
  "pageNum":1,
  "pageSize":10
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
        "discussSn": "YJ30251107172948307968",
        "discussStatus": 1,
        "spuName": "s2501228549",
        "skcName": "ss25012285492844",
        "supplierCode": "1234287-westmonth-481.1",
        "productTitle": "SRAH'SHOPEELHOE Electric Anti-Wrinkle Eye Cream Lifting Firming Moisturizing Reducing Fine Lines Eye Bags Dark Circles Eye Care11999888",
        "saleAttributeValue": "Army Green",
        "mainPicUrl": "https://img.ltwebstatic.com/images3_spmp/2024/11/29/be/1732860076c6e0d55b84433a061ae2bd3aaf18473b_square.jpg",
        "allPicUrls": [
          "https://img.ltwebstatic.com/images3_spmp/2024/11/29/be/1732860076c6e0d55b84433a061ae2bd3aaf18473b_square.jpg",
          "https://img.ltwebstatic.com/images3_spmp/2025/01/22/cc/17375297668e8a6193029f772d9da4244cb673da92_square.jpg",
          "https://img.ltwebstatic.com/images3_spmp/2025/01/22/1e/1737529770d0eff71f021c0216ab5382199a89b6bb_square.jpg",
          "https://img.ltwebstatic.com/images3_spmp/2025/01/22/e7/173752977548b263cd797420d7d4e9c5a596bdcf6f_square.jpg",
          "https://imgdeal-test01.shein.com/images3_pi/2025/01/22/00/17375297821232599685_square.jpeg",
          "https://imgdeal-test01.shein.com/images3_pi/2025/01/22/a6/17375297844286045663_square.jpeg",
          "https://imgdeal-test01.shein.com/images3_pi/2025/01/22/26/17375297872895279191_square.jpeg",
          "https://img.ltwebstatic.com/images3_spmp/2024/11/29/be/1732860076c6e0d55b84433a061ae2bd3aaf18473b_square.jpg",
          "https://img.ltwebstatic.com/images3_spmp/2025/01/21/58/17374406563ab9ef9bf71874ee0a3a6697fedc29fe.jpg",
          "https://img.ltwebstatic.com/images3_spmp/2025/01/21/c8/1737440653da9e412d426641d7950bce6e8d3cc529_square.jpg",
          "https://imgdeal-test01.shein.com/images3_pi/2025/01/22/5b/17375297893352422689.jpeg",
          "https://img.ltwebstatic.com/images3_spmp/2024/11/29/09/17328677228845557c7afea1dfb5673220d7e8a72b.jpg"
        ],
        "serialNumber": 2,
        "skuCostPrices": [
          {
            "skuCode": "I4ajkf1r3xrs",
            "saleAttributeValues": [],
            "costPriceHistories": [
              {
                "serialNumber": 0,
                "costPrice": 481.1,
                "currency": "EUR"
              },
              {
                "serialNumber": 1,
                "costPrice": 480,
                "currency": "EUR"
              }
            ],
            "suggestCostPrice": 280,
            "suggestCostCurrency": "EUR",
            "latestCostPrice": 480
          }
        ],
        "discussType": 3,
        "appealReason": "",
        "appealCount": 3,
        "fileUploadList": null,
        "reason": null,
        "isSizeSamePrice": 0
      },
      {
        "discussSn": "YJ30251107169517383680",
        "discussStatus": 1,
        "spuName": "f250606571555",
        "skcName": "sf25060657155599136",
        "supplierCode": "C3OGFO-TTP8UV-Y2IE9K",
        "productTitle": "shein",
        "saleAttributeValue": "tight",
        "mainPicUrl": "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/32/1749190480c43a1f8a66b2ae3ce659dba397531431_square.jpg",
        "allPicUrls": [
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/32/1749190480c43a1f8a66b2ae3ce659dba397531431_square.jpg",
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/5f/17491904828572b894374054d55304cf37a943c75c_square.jpg",
          "https://imgdeal-test01.shein.com/v4/p/pi/2025/06/06/78/174919048333ee43378e1afdcd591559215de743c4_square.png",
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/7f/1749190484babc7fda118a3fe5151cf0a00529aec3_square.jpg",
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/47/1749190489b161ef52b8519e11190b229d77ce4da4_square.jpg",
          "https://imgdeal-test01.shein.com/v4/p/pi/2025/06/06/4f/17491904911f230b051303efbca75ef381297f3825_square.png",
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/24/1749190491ea920fab83ea4bc6d7c5fa5d06bb7e7f_square.jpg"
        ],
        "serialNumber": 1,
        "skuCostPrices": [
          {
            "skuCode": "I84mm55j5vwd",
            "saleAttributeValues": [
              "Flowers"
            ],
            "costPriceHistories": [
              {
                "serialNumber": 0,
                "costPrice": 1,
                "currency": "EUR"
              }
            ],
            "suggestCostPrice": 0.01,
            "suggestCostCurrency": "EUR",
            "latestCostPrice": null
          },
          {
            "skuCode": "I84mm55j6dc5",
            "saleAttributeValues": [
              "Print"
            ],
            "costPriceHistories": [
              {
                "serialNumber": 0,
                "costPrice": 1,
                "currency": "EUR"
              }
            ],
            "suggestCostPrice": 0.01,
            "suggestCostCurrency": "EUR",
            "latestCostPrice": null
          }
        ],
        "discussType": 3,
        "appealReason": "",
        "appealCount": 4,
        "fileUploadList": null,
        "reason": null,
        "isSizeSamePrice": 0
      },
      {
        "discussSn": "YJ30251107169332834304",
        "discussStatus": 1,
        "spuName": "f250606571555",
        "skcName": "sf25060657155510001",
        "supplierCode": "C3OGFO-TTP8UV-8OWXJP",
        "productTitle": "shein",
        "saleAttributeValue": "DYJ_ long sleeves",
        "mainPicUrl": "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/32/1749190480c43a1f8a66b2ae3ce659dba397531431_square.jpg",
        "allPicUrls": [
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/32/1749190480c43a1f8a66b2ae3ce659dba397531431_square.jpg",
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/5f/17491904828572b894374054d55304cf37a943c75c_square.jpg",
          "https://imgdeal-test01.shein.com/v4/p/pi/2025/06/06/78/174919048333ee43378e1afdcd591559215de743c4_square.png",
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/7f/1749190484babc7fda118a3fe5151cf0a00529aec3_square.jpg",
          "https://imgdeal-test01.shein.com/v4/j/pi/2025/06/06/9d/17491904888cd6eda5353e7ac06aafd3f0b028e164_square.jpg"
        ],
        "serialNumber": 1,
        "skuCostPrices": [
          {
            "skuCode": "I84mm55j4qpu",
            "saleAttributeValues": [
              "Print"
            ],
            "costPriceHistories": [
              {
                "serialNumber": 0,
                "costPrice": 1,
                "currency": "EUR"
              }
            ],
            "suggestCostPrice": 0.01,
            "suggestCostCurrency": "EUR",
            "latestCostPrice": null
          },
          {
            "skuCode": "I84mm55j3ss0",
            "saleAttributeValues": [
              "Flowers"
            ],
            "costPriceHistories": [
              {
                "serialNumber": 0,
                "costPrice": 1,
                "currency": "EUR"
              }
            ],
            "suggestCostPrice": 0.01,
            "suggestCostCurrency": "EUR",
            "latestCostPrice": null
          }
        ],
        "discussType": 3,
        "appealReason": "",
        "appealCount": 4,
        "fileUploadList": null,
        "reason": null,
        "isSizeSamePrice": 0
      }
    ],
    "count": 3
  },
  "bbl": null,
  "traceId": "f2d4974508bd3d5b"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001891。