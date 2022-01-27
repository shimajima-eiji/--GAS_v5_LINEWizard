## 経緯
いつもLINEBotでオウム返しする方法を調べるので、自力でなんとかできるようにコードを整備する。

## 主要リンク
- [リポジトリ](https://github.com/shimajima-eiji/--GAS_v5_LineWizard)
- [Gdrive:ディレクトリ](https://drive.google.com/drive/my-drive)
- [Gdrive:スクリプト](https://script.google.com/home)
- [Gdrive:スプレッドシート](https://docs.google.com/spreadsheets)
- [LINEBOT:Webhookとチャネルアクセストークン](https://developers.line.biz/console/channel/(チャネルID)/messaging-api?status=success)
- [LINEBOT:グループ設定など](https://manager.line.biz/account/(アカウントID)/setting)

## バージョン
- README: ver1.2022.01.27

## 制限
デバッグ時はトークに送信できない。
（リプライトークンが無効になるため）

## 環境変数
|key|value|用途|備考|
|---|---|---|---|
|SSID_DEBUG|デバッグ用のスプレッドシートID|デバッグ|https://docs.google.com/spreadsheets/d/(ここがSSID)/edit|
|SSNAME_DEBUG|デバッグ用のスプレッドシート名|デバッグ|上記のシート名|
|SSID_REGIST_STEP|登録用のスプレッドシートID|デバッグ|https://docs.google.com/spreadsheets/d/(ここがSSID)/edit|
|SSNAME_REGIST_STEP|登録用のスプレッドシート名|デバッグ|上記のシート名|
|ACCESS_TOKEN|チャネルアクセストークン|LINEに送るため必須|https://developers.line.biz/console/channel/(LINEチャネル)/messaging-api?status=success|
|DEBUG|true/false(String)|デバッグフラグ|`debug_flag()`を実行することでフラグ反転できる|

## デバッガ
```
function debug_(関数名) {
}
```

## パラメータ
### doPost引数
LINEの標準入力に準拠
contents.events[0]以下は以下の通り。

|リクエストボディ|必須|概要|
|---|---|---|
|.message.text|必須|テキスト|
|.replyToken|必須|トークで使用しているが、グループからも送信されるので必須とする|
|.source.groupId||LINEグループID|

### 戻り値
JSON形式

|パラメータ|出力例|
|---|---|
|result|True/False|
|message|リクエストボディの`.message.text`と同じ|
|groupId|リクエストボディの`.source.groupId`と同じ|

## READMEフォーマットのバージョン
ver2.2022.01.27
