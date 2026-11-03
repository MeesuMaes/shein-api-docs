# 快速接入

SHEIN 开放平台所有 Open API 都走同一套请求约定，业务字段之外的差异只在路径与方法。

## 环境域名

| 环境 | 域名 |
| --- | --- |
| 测试 | `openapi-test01.sheincorp.cn` |
| 生产 | 以开放平台应用详情页公布的域名为准 |

## 公共请求头

| 请求头 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `Content-Type` | string | 是 | `application/json` |
| `x-lt-openKeyId` | string | 是 | 访问用户隐私数据时的唯一权限标识 openKeyId |
| `x-lt-signature` | string | 是 | 接口签名 |
| `x-lt-timestamp` | string | 是 | 请求时间戳，毫秒（1970-01-01 起算），如 `158339876400` |
| `language` | string | 是 | 语种：`US` 英语、`FR` 法语、`ES` 西班牙语、`DE` 德语、`CN` 中文简体、`TH` 泰语、`PT` 巴西葡语、`TR` 土耳其语 |

## 凭证获取

1. 在开放平台创建应用并审核通过，获取 `APP_ID`。
2. 调用 `POST /open-api/auth/get-by-token`（见[获取openKeyId和secretKey](/auth/get-by-token)）换取 `openKeyId` 与 `secretKey`。
3. `openKeyId` 放入 `x-lt-openKeyId`，`secretKey` 只用于本地计算签名，不随请求发送。

## 签名

签名算法为 **HMAC-SHA256**。各接口文档只声明"请求签名"，未公开完整拼接规则，具体算法以开放平台《授权手册》为准，不要凭猜测实现。

实践中需要注意：

- `secretKey`、签名值不进日志、不进代码仓库。
- `x-lt-timestamp` 参与签名且有时效窗口，服务器与本机时钟要保持一致。

## 调用示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods/discuss/query-discuss-list' \
--header 'x-lt-signature: <签名>' \
--header 'x-lt-openKeyId: <openKeyId>' \
--header 'x-lt-timestamp: 1762494208230' \
--header 'language: CN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "discussStatus": "",
  "pageNum": 1,
  "pageSize": 10
}'
```

## 返回结构

业务接口统一返回：

```json
{
  "code": "0",
  "msg": "OK",
  "info": {},
  "traceId": "..."
}
```

`code` 为 `"0"` 表示成功，其余为业务错误码；`traceId` 在排查问题时提供给平台方。

## QPS

每个接口的 QPS 上限写在对应文档页的元信息里，超限会被限流。批量同步场景请按目标接口的 QPS 设计并发与退避。
