# 获取视频转换结果

`POST /open-api/goods/product/query-video-transform-task`

**QPS**：10 ｜ **合作模式**：自运营 / 全托管 / 半托管 ｜ **文档版本**：v2 ｜ **更新时间**：2026-09-02 10:21:45 ｜ **所属权限包**：[商品视频](/packages/product-video) ｜ **官方文档**：[3002021](https://open.sheincorp.com/documents/apidoc/detail/3002021)

## 接口说明

商品视频的调用顺序：①查询规范确认分类下能否发布视频 → ②创建视频转换任务 → ③监听任务完成通知 → ④查询任务获取转换后URL→⑤使用转换后URL发布/编辑商品。
此接口为顺序中的④步骤。商品视频的详细方案请参考： https://open.sheincorp.com/documents/system/16a63f9f-7237-47bd-94c9-37059aa25554

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：1583398764000
- **x-lt-signature** `string` **必填** — 接口签名
- **language** `string` — 支持返回的多语言报错信息，例如：language:en。默认返回中文多语言信息 英语:en 法语: fr 西班牙语:es 德语:de 中文简体:zh-cn 泰语:th 巴西葡语:pt-br

## 请求参数

- **task_ids** `string[]` **必填** — 转换任务id。支持批量查询，单次最多10个任务。 通过/open-api/goods/product/create-video-transform-task获取。 例: `1`

## 响应参数

- **code** `string` **必填** — 响应码。成功为0。 例: `0`
- **msg** `string` **必填** — 响应信息。成功为OK 例: `OK`
- **info** `object` — 响应详情。
  - **data** `object[]` — 任务详情。仅返回有效task_id的数据。
    - **task_id** `string` — 转换任务id 例: `0c8f883ea25b4dde9702ff9138bcbf93`
    - **task_status** `integer` — 转换任务状态。0：未开始；1：成功；2：失败 例: `1`
    - **fail_reason** `json` — 失败原因。仅在task_status=2时出现。
    - **transformed_url** `string` — 转换后的SHEIN链接 例: `https://videodeal-test01.shein.com/spmp/2025/12/24/99/1766570058d1e78af9f44232f3`
  - **meta** `object` — 其他数据
    - **count** `integer` — 计数值 例: `1`
    - **customObj** `json`
- **traceId** `string` — 追踪码 例: `e8b99e017bd4f9e0`

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'https://openapi.sheincorp.com/open-api/goods/product/query-video-transform-task' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1766719459171' \
--header 'language: zh-cn' \
--header 'Content-Type: application/json' \
--header 'Host: openapi.sheincorp.com' \
--data-raw '{
"task_ids":["64f814b2e56543199174c474a71ba9f8"]
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
        "task_id": "64f814b2e56543199174c474a71ba9f8",
        "task_status": 1,
        "fail_reason": null,
        "transformed_url": "https://svideo.ltwebstatic.com/spmp/2025/12/26/3b/1766719440a70d55e290609caa84dcbf11d177e16e.mp4"
      }
    ],
    "meta": {
      "count": 1,
      "customObj": null
    }
  },
  "bbl": null,
  "traceId": "6a483cc987ca607f"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3002021。