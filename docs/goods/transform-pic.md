# 图片链接转换

`POST /open-api/goods/transform-pic`

**QPS**：60 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v20 ｜ **更新时间**：2025-08-12 11:32:52 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001360](https://open.sheincorp.com/documents/apidoc/detail/3001360)

## 接口说明

支持将外部的图片地址转换成SHEIN可用的图片地址，各类型图片需满足下方要求，否则无法转换，建议开发者将图片在本地处理完成后再调用接口。
- 主图（type=1)、细节图（type=2)：像素满足1340px*1785px，或宽高比例1:1，像素范围900px-2200px；格式JPG/JPEG/PNG；大小≤3MB
- 方形图（type=5）：宽高比例1:1；像素范围900*900~2200*2200 px；格式JPG/JPEG/PNG；大小≤3MB
- 色块图（type=6）：宽高比例1:1；像素80×80 px；格式JPG/JPEG/PNG；大小≤3MB
- 详情图（type=7）：宽高比例3:4，像素大于900px； 格式JPG/JPEG/PNG；大小≤3MB
每个店铺的各个分类下，需要传什么类型的图、可以传几张图，可通过文档确认：商品图片。

## 请求头

- **language** `string` **必填** — 默认返回中文多语言信息，支持语种：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br
- **Content-Type** `string` **必填** — 默认值：application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **image_type** `integer` **必填** — 图片类型(1:主图; 2:细节图; 5:方块图; 6:色块图; 7:详情图) 。 各个类型的图片要求参考文档顶部的描述。
- **original_url** `string` **必填** — 图片地址。

## 响应参数

- **bbl** `object` — bbl
  - **info** `object`
    - ***** `object[]`
  - **npid** `string`
- **code** `string` **必填** — 成功: 0
- **info** `object`
  - **failure_reason** `string` — 失败原因
  - **original** `string` **必填** — 图片链接
  - **transformed** `string` — 转换后的图片链接
- **msg** `string` — 错误描述, 成功: OK
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/transform-pic' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
  "image_type": 2,
  "original_url": "http://imgdeal-test01.shein.com/images3_pi/2023/11/15/fe/17000325694031071724_square.jpg"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "original": "http://imgdeal-test01.shein.com/images3_pi/2023/11/15/fe/17000325694031071724_square.jpg",
    "transformed": "",
    "failure_reason": "图片下载异常"
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001360。