# 查询代理公司列表

`POST /open-api/goods-compliance/agency-list`

**QPS**：20 ｜ **合作模式**：自运营 / 全托管 / 半托管 / POP ｜ **文档版本**：v8 ｜ **更新时间**：2026-06-29 17:39:21 ｜ **所属权限包**：[商品合规资质](/packages/compliance) ｜ **官方文档**：[3001848](https://open.sheincorp.com/documents/apidoc/detail/3001848)

## 接口说明

查询商家申报的代理公司信息，包括欧盟责任人、制造商、美国代理、英国代理，此接口的返回信息在SKC绑定代理公司时会使用。
代理公司的整体解决方案，可点击查看文档。

## 请求头

- **Content-Type** `string` **必填** — application/json
- **x-lt-openKeyId** `string` **必填** — 访问用户隐私数据时的唯一权限标识 openKeyId
- **x-lt-timestamp** `string` **必填** — 请求时间戳，格式为时间转换为毫秒的值，也就是从1970年1月1日起至今的时间转换为毫秒，如：158339876400
- **x-lt-signature** `string` **必填** — 查看签名生成规则
- **language** `string` — 指定出参语种，默认中文；支持语种:英语:EN 法语:FR 西班牙语:ES 德语:DE 中文简体:CN 泰语:TH 巴西葡语:PT 土耳其语：TR

## 请求参数

- **agencyId** `int64` — 代理公司ID
- **agencyName** `string` — 代理公司名称（精确匹配，不支持模糊匹配）
- **pageNum** `integer` **必填** — 页码，从1开始
- **pageSize** `integer` **必填** — 每页大小，最多100

## 响应参数

- **code** `string` **必填** — 响应编码 成功：0
- **msg** `string` — 错误描述,成功：OK
- **info** `object[]` — 代理公司信息响应
  - **agencyAgreementName** `string` — 代理协议名称
  - **agencyAgreementUrl** `string` — 代理协议url
  - **agencyCityName** `string` — 城市
  - **agencyCountryName** `string` — 国家/地区
  - **agencyDetailAddress** `string` — 详细地址
  - **agencyEndTime** `string` — 代理期限结束时间
  - **agencyId** `int64` — 代理公司ID
  - **agencyName** `string` — 代理公司名称
  - **agencyProvinceName** `string` — 省/州
  - **agencyStartTime** `string` — 代理期限开始时间
  - **agencyStatus** `integer` — 代理公司状态，基于代理期限时间生成的状态。0-生效中，1-已过期，2-未生效。 agencyStatus=0，且applyStatus=1/2的代理公司才可以和SKC绑定。
  - **agencySubType** `integer` — 代理公司的二级类型。只有0-欧盟责任人有二级类型：20-欧洲代理；21-欧盟制造商；22-欧盟进口商；23-欧盟配送服务提供商
  - **agencyType** `integer` — 代理公司的一级类型。0-欧盟责任人；1-英国代理；2-美国代理；3-制造商
  - **applyStatus** `integer` — 代理申报的审核状态。0-待补充；1-待审核（商家后台页面会展示申报成功，接口层可认为此状态的代理公司可以和SKC绑定）；2-申报成功；3-审核失败； agencyStatus=1，且applyStatus=1/2的代理公司才可以和SKC绑定。
  - **areaCode** `string` — 联系电话区号
  - **brandCodes** `string[]` — 品牌编码列表
  - **contactName** `string` — 联系人姓名
  - **coveredProductRange** `integer` — 代理公司覆盖的商品范围。1-全部商品；2-部分商品； 覆盖范围是1-全部商品时，SKC生成后将自动和代理公司完成绑定，不需要手动绑定。
  - **createTime** `datetime` — 代理公司的创建时间
  - **email** `string` — 电子邮箱
  - **originType** `integer` — 来源类型：0-手动创建，1-线上办理
  - **postalCode** `string` — 邮政编码
  - **supplierId** `int64` — 商家ID
  - **telephone** `string` — 联系电话
  - **title** `string` — 责任人/公司名称
  - **updateTime** `datetime` — 代理公司信息的更新时间
- **traceId** `string` — 追踪码

&lt;details>
&lt;summary>请求与响应示例&lt;/summary>

### 请求示例

```bash
curl --location --request POST 'http://openapi-test01.sheincorp.cn/open-api/goods-compliance/agency-list' \
--header 'x-lt-signature: test' \
--header 'x-lt-openKeyId: test' \
--header 'x-lt-timestamp: 1782367299697' \
--header 'Content-Type: application/json' \
--header 'Host: openapi-test01.sheincorp.cn' \
--data-raw '{
    "pageSize":10,
    "pageNum":1
}'
```

### 响应示例

```json
{
  "code": "0",
  "msg": "OK",
  "info": [
    {
      "agencyId": 456646002,
      "agencyType": 4,
      "agencySubType": 40,
      "agencyStartTime": "2026-04-21",
      "agencyEndTime": "2099-12-31",
      "agencyStatus": 0,
      "coveredProductRange": 2,
      "brandCodes": [],
      "applyStatus": 1,
      "supplierId": 38109363,
      "createTime": "2026-04-21 15:23:41",
      "updateTime": "2026-04-21 15:23:41",
      "originType": 2,
      "agencyAgreementName": "默认SHEIN土代信息（Evon Sai）.pdf",
      "agencyAgreementUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc3175762243675432960.pdf",
      "agencyName": "Evon Sai Depolama Hizmetleri Ve Ticaret Limited Şirketi",
      "title": "Evon Sai Depolama Hizmetleri Ve Ticaret Limited Şirketi(456646002)",
      "contactName": "",
      "areaCode": "+86",
      "telephone": "",
      "email": "urun.guvenligi@sheingroup.com",
      "agencyDetailAddress": "BAHCELIEVLER MAH. SAKLIVADI SK. MY CLUB FITNISS LIFE CENTERS BLOK NO: 28 IC KAPI NO: Z3 BAHCELIEVLER / ISTANBUL, TURKEY",
      "postalCode": "34180",
      "agencyCountryName": "Turkey",
      "agencyProvinceName": "İstanbul",
      "agencyCityName": "Bahçelievler"
    },
    {
      "agencyId": 118021903,
      "agencyType": 0,
      "agencySubType": 20,
      "agencyStartTime": "2025-11-05",
      "agencyEndTime": "2031-11-30",
      "agencyStatus": 0,
      "coveredProductRange": 2,
      "brandCodes": null,
      "applyStatus": 2,
      "supplierId": 38109363,
      "createTime": "2025-11-05 17:48:00",
      "updateTime": "2025-11-05 17:48:00",
      "originType": 1,
      "agencyAgreementName": "2200_2200.jpg",
      "agencyAgreementUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc3095863570711977984.jpg",
      "agencyName": "测试代理0903",
      "title": "测试代理0903",
      "contactName": "../../../../WEB-INF/web.xml;张三",
      "areaCode": "86",
      "telephone": "18212340001",
      "email": "5123@456.com",
      "agencyDetailAddress": "天会111",
      "postalCode": "010",
      "agencyCountryName": "中国",
      "agencyProvinceName": "上海",
      "agencyCityName": "长宁"
    },
    {
      "agencyId": 117985610,
      "agencyType": 0,
      "agencySubType": 20,
      "agencyStartTime": "2025-10-28",
      "agencyEndTime": "2025-11-28",
      "agencyStatus": 0,
      "coveredProductRange": 2,
      "brandCodes": [],
      "applyStatus": 1,
      "supplierId": 38109363,
      "createTime": "2025-10-29 22:44:01",
      "updateTime": "2025-10-29 22:44:01",
      "originType": 0,
      "agencyAgreementName": "label-39.png",
      "agencyAgreementUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc3086018410268368896.png",
      "agencyName": "neossmscompany01",
      "title": "neossmscompany01",
      "contactName": "11",
      "areaCode": "+32",
      "telephone": "1111111",
      "email": "111@qq.com",
      "agencyDetailAddress": "11",
      "postalCode": "1111",
      "agencyCountryName": "Belgium",
      "agencyProvinceName": "1",
      "agencyCityName": "1"
    },
    {
      "agencyId": 39664769,
      "agencyType": 0,
      "agencySubType": 20,
      "agencyStartTime": "2025-09-01",
      "agencyEndTime": "2026-09-30",
      "agencyStatus": 0,
      "coveredProductRange": 1,
      "brandCodes": [],
      "applyStatus": 1,
      "supplierId": 38109363,
      "createTime": "2025-09-05 15:00:22",
      "updateTime": "2026-06-18 14:54:03",
      "originType": 0,
      "agencyAgreementName": "色块图.jpg",
      "agencyAgreementUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc3007275897269561344.jpg",
      "agencyName": "EU agency 2",
      "title": "EU agency 2",
      "contactName": "5343524",
      "areaCode": "+43",
      "telephone": "45454",
      "email": "45435@qq.com",
      "agencyDetailAddress": "45345425342",
      "postalCode": "4545",
      "agencyCountryName": "Austria",
      "agencyProvinceName": "Burgenland",
      "agencyCityName": "Gattendorf"
    },
    {
      "agencyId": 39258755,
      "agencyType": 3,
      "agencySubType": 0,
      "agencyStartTime": null,
      "agencyEndTime": null,
      "agencyStatus": 0,
      "coveredProductRange": 1,
      "brandCodes": null,
      "applyStatus": 3,
      "supplierId": 38109363,
      "createTime": "2025-06-20 16:54:14",
      "updateTime": "2025-10-11 18:21:17",
      "originType": 0,
      "agencyAgreementName": "",
      "agencyAgreementUrl": "",
      "agencyName": "this is manufacture name",
      "title": "this is manufacture name",
      "contactName": "",
      "areaCode": "+355",
      "telephone": "4545",
      "email": "manufacture@email.com",
      "agencyDetailAddress": "this is manufacture address",
      "postalCode": "039333",
      "agencyCountryName": "Albania",
      "agencyProvinceName": "testlq",
      "agencyCityName": "asdfsadf"
    },
    {
      "agencyId": 39142599,
      "agencyType": 2,
      "agencySubType": 0,
      "agencyStartTime": "2025-05-19",
      "agencyEndTime": "2026-05-31",
      "agencyStatus": 0,
      "coveredProductRange": 1,
      "brandCodes": null,
      "applyStatus": 3,
      "supplierId": 38109363,
      "createTime": "2025-05-19 15:50:42",
      "updateTime": "2026-04-02 20:21:48",
      "originType": 0,
      "agencyAgreementName": "色块图.jpg",
      "agencyAgreementUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc2849325473162930176.jpg",
      "agencyName": "US agency",
      "title": "US agency",
      "contactName": "name",
      "areaCode": "+1",
      "telephone": "4534543",
      "email": "test@gmail.com",
      "agencyDetailAddress": "test content",
      "postalCode": "20001",
      "agencyCountryName": "United States",
      "agencyProvinceName": "test",
      "agencyCityName": "test"
    },
    {
      "agencyId": 39142598,
      "agencyType": 2,
      "agencySubType": 0,
      "agencyStartTime": null,
      "agencyEndTime": null,
      "agencyStatus": -1,
      "coveredProductRange": 2,
      "brandCodes": null,
      "applyStatus": 1,
      "supplierId": 38109363,
      "createTime": "2025-05-19 15:49:34",
      "updateTime": "2025-10-22 14:06:12",
      "originType": 0,
      "agencyAgreementName": "",
      "agencyAgreementUrl": "",
      "agencyName": "Test Manufacture",
      "title": "Test Manufacture",
      "contactName": "",
      "areaCode": "+501",
      "telephone": "34354",
      "email": "test@gmail.com",
      "agencyDetailAddress": "test content",
      "postalCode": "00000",
      "agencyCountryName": "Belize",
      "agencyProvinceName": "test",
      "agencyCityName": "test"
    },
    {
      "agencyId": 39141848,
      "agencyType": 0,
      "agencySubType": 20,
      "agencyStartTime": "2025-05-08",
      "agencyEndTime": "2025-10-31",
      "agencyStatus": 0,
      "coveredProductRange": 1,
      "brandCodes": null,
      "applyStatus": 1,
      "supplierId": 38109363,
      "createTime": "2025-05-08 09:44:02",
      "updateTime": "2025-08-27 14:55:00",
      "originType": 0,
      "agencyAgreementName": "方块图.jpeg",
      "agencyAgreementUrl": "https://pqms-1259571579.cos.ap-nanjing.myqcloud.com/gpc2833011290120695808.jpeg",
      "agencyName": "EU agency",
      "title": "EU agency",
      "contactName": "bennie",
      "areaCode": "+43",
      "telephone": "343545",
      "email": "2374504@gmail.com",
      "agencyDetailAddress": "Test content",
      "postalCode": "12345",
      "agencyCountryName": "Germany",
      "agencyProvinceName": "Frankfurt",
      "agencyCityName": "am"
    }
  ],
  "bbl": null,
  "traceId": "9eb97279936d05aa"
}
```

&lt;/details>

---

本页由 [shein-api-docs](https://github.com/MeesuMaes/shein-api-docs) 自动抓取自官方文档 3001848。