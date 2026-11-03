# 本地图片上传

`POST /open-api/goods/upload-pic`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v19 ｜ **更新时间**：2025-08-12 11:32:25 ｜ **所属权限包**：[商品管理](/packages/goods) ｜ **官方文档**：[3001359](https://open.sheincorp.com/documents/apidoc/detail/3001359)

## 接口说明

支持将图片文件转换成SHEIN可用的在线图片链接。各类型图片需满足下方要求，否则无法转换，建议开发者将图片在本地处理完成后再调用接口。
- 主图（type=1)、细节图（type=2)：像素满足1340px*1785px，或宽高比例1:1，像素范围900px-2200px；格式JPG/JPEG/PNG；大小≤3MB
- 方形图（type=5）：宽高比例1:1；像素范围900*900~2200*2200 px；格式JPG/JPEG/PNG；大小≤3MB
- 色块图（type=6）：宽高比例1:1；像素80×80 px；格式JPG/JPEG/PNG；大小≤3MB
- 详情图（type=7）：宽高比例3:4，像素大于900px； 格式JPG/JPEG/PNG；大小≤3MB
每个店铺的各个分类下，需要传什么类型的图、可以传几张图，可通过文档确认：商品图片。

## 请求头

- **Content-Type** `string` — 默认值：multipart/form-data
- **language** `string` **必填** — 默认返回中文多语言信息，支持语种：英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名

## 请求参数

- **image_type** `int64` **必填** — 图片类型(1:主图; 2:细节图; 5:方块图; 6:色块图; 7:详情图) 各个类型的图片要求参考文档顶部的描述。
- **file** `blob` **必填** — 图片文件

## 响应参数

- **bbl** `object` **必填**
  - **info** `object` **必填**
  - **npid** `string` 例: `17210`
- **code** `string` 例: `29045`
- **info** `object` **必填**
  - **height** `integer` — 高 例: `21158`
  - **image_hex_type** `string` — 图片类型 例: `nesciunt asperiores voluptate velit laudantium quo numquam laudantium dolore et `
  - **image_url** `string` — 图片链接 例: `molestiae velit earum fugit hic consectetur eligendi corrupti expedita inventore`
  - **size** `integer` — 大小 例: `34153`
  - **width** `integer` — 宽 例: `59832`
- **msg** `string` 例: `quas corporis sunt laboriosam reprehenderit doloribus iusto harum`
- **traceId** `string` — 请求的唯一标识；用于异常报错跟踪

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi-test01.sheincorp.cn/open-api/goods/upload-pic' \
--header 'language: zh-cn' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-signature: test' \
--header 'x-lt-timestamp: 1752733538805' \
--header 'Host: openapi-test01.sheincorp.cn' \
--form 'image_type="2"' \
--form 'file=@"/Users/10124378/Downloads/760eecab5aab4e7a8adec5961c795e50 (1).jpg"'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "image_url": "http://imgdeal-test01.shein.com/images3_pi/2023/11/15/3c/17000397694031071724_square.jpg",
    "width": 1200,
    "height": 1200,
    "size": 363846,
    "image_hex_type": "jpg"
  },
  "bbl": null
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001359。