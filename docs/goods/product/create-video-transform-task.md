# 创建商品视频转换任务

`POST /open-api/goods/product/create-video-transform-task`

**QPS**：10 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-09-02 10:21:29 ｜ **所属权限包**：[商品视频](/packages/product-video) ｜ **官方文档**：[3002020](https://open.sheincorp.com/documents/apidoc/detail/3002020)

## 接口说明

商品视频的调用顺序：①查询规范确认分类下能否发布视频 → ②创建视频转换任务 → ③监听任务完成通知 → ④查询任务获取转换后URL→⑤使用转换后URL发布/编辑商品。
此接口为顺序中的②步骤。商品视频的详细方案请参考： https://open.sheincorp.com/documents/system/16a63f9f-7237-47bd-94c9-37059aa25554

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **video_url** `string` **必填** — 视频文件的URL地址。 视频要求：仅支持MP4格式，视频最大100M，视频内容不包含敏感信息，无水印。 URL地址要求：非SHEIN的视频地址，地址后缀必须是.mp4，地址可访问，可下载。不可提供在线视频网站的地址。开发者请前置确认URL是否符合要求。 例: `https://media.w3.org/2010/05/sintel/trailer.mp4`

## 响应参数

- **code** `string` **必填** — 响应码。成功为0。 例: `0`
- **msg** `string` **必填** — 响应信息。成功为OK 例: `OK`
- **info** `object` — 响应详情。
  - **task_id** `string` **必填** — 转换任务id。提供的视频URL满足校验后，会生成此视频的转换任务唯一ID。 转换为异步操作，后续需要通过task_id去查询获取转换结果。 例: `67886e901dcd47e9bd3563301cc948e5`
  - **transformed_url** `string` — 转换后的SHEIN视频地址。 如果入参的video_url在最近一周内有成功转换过，则接口会即时返回上一次的转换结果。 例: `https://videodeal-test01.shein.com/spmp/2025/12/17/ad/1765941859960c1bebeead68ad`
- **traceId** `string` — 追踪id 例: `38fbc688c47954a9`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/product/create-video-transform-task' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1767494034702' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
  "video_url": "https://vjs.zencdn.net/v/oceans.mp4"
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": {
    "task_id": "0c8f883ea25b4dde9702ff9138bcbf93",
    "transformed_url": null
  },
  "bbl": null,
  "traceId": "b0ad83ec22f33777"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002020。