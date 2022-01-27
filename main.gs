function main(message) {
  const MESSAGE_PATTERN = {
    "LINEで登録": (message) => line_register_step(message),
  }

  // LINE登録モードの場合、強制的にLINE登録処理
  if(property("STEP_MODE").value == "LINE_REGISTER") return MESSAGE_PATTERN["LINEで登録"](message);

  return (Object.keys(MESSAGE_PATTERN).includes(message))
    ? MESSAGE_PATTERN[message](message)
    : "メニューから入力内容を設定してください。";
}

// 「LINEで登録」と入力された場合の処理
function line_register_step(message) {
  // 対話フェーズのアクセサ
  function phase(counter) {
    const PROPERTY_PHASE = "PHASE";

    // カウンタがなければget
    if(counter == undefined) {
      let phase = parseInt(property(PROPERTY_PHASE).value);
      return (Number.isNaN(phase))
      ? 0
      : phase

    // カウンタがあればset
    } else {
      property(PROPERTY_PHASE, counter);
    }
  }

  const SSID = property("SSID_REGIST_STEP").value;
  const SSNAME = property("SSNAME_REGIST_STEP").value;
  const SHEET = SpreadsheetApp.openById(SSID).getSheetByName(SSNAME);
  const RANGE = SHEET.getRange(2,1,4,2)
  const DATA = RANGE.getValues();
  // index=0: 表示文、index=1: 入力値

  index = phase()

  // 「登録が完了しました」の場合、初期化して出力する
  if(index >= DATA.length - 1) {
    phase(0);
    property("STEP_MODE", "")
    return DATA[index][0];
  }

  // 最初と最後以外、入力処理をする
  if(index > 0) {
    DATA[index - 1][1] = message;
    Logger.log(DATA);
    RANGE.setValues(DATA);
  }

  // 終わったら出力設定をしてカウンタを回す
  message = DATA[index][0];
  phase(index + 1);

  // 他の入力より優先するため、ステップモードで処理する
  property("STEP_MODE", "LINE_REGISTER");
  return message;
}
