// ============================================
// 条件分岐(JavaScript Primer)
// ============================================
// 結論
// - if文の {} は、処理が1行でも省略しない
// - 条件が増えたら、ネスト(入れ子)より else if で平らに書く
// - else if は上から順に判定されるので、条件の順番が結果を左右する
// - switch文は break を忘れると、下の case まで実行されてしまう
//   関数の中で return を使う形にすると、break 忘れを防げる

// --------------------------------------------
// 1. if文
// --------------------------------------------
const x = 42;
if (x > 10) {
  console.log("xは10より大きな値"); // 実行される
}

// 処理が1行なら {} を省略できるが、行を追加したときのバグの原因になるので省略しない
// if (x > 10)
//   console.log("この行だけがif文の中");

// 条件式には真偽値以外も書ける。truthy なら実行、falsy なら実行されない
if ("文字列") {
  console.log("truthyなので実行される");
}

// --------------------------------------------
// 2. else if と else
// --------------------------------------------
const version = "ES6";
if (version === "ES5") {
  console.log("ECMAScript 5");
} else if (version === "ES6") {
  console.log("ECMAScript 2015"); // 実行される
} else if (version === "ES7") {
  console.log("ECMAScript 2016");
} else {
  console.log("知らないバージョンです"); // どれにも当てはまらないとき
}
// 上から順に判定し、最初に当てはまった1つだけが実行される

// --------------------------------------------
// 3. ネストを else if で平らにする(うるう年の判定)
// --------------------------------------------
// うるう年のルール
// - 4で割り切れる年はうるう年
// - ただし100で割り切れる年はうるう年ではない
// - ただし400で割り切れる年はうるう年

const year = new Date().getFullYear();

// ネストした書き方:正しいが、階層が深くて読みにくい
if (year % 4 === 0) {
  if (year % 100 === 0) {
    if (year % 400 === 0) {
      console.log(`${year}年はうるう年です`);
    } else {
      console.log(`${year}年はうるう年ではありません`);
    }
  } else {
    console.log(`${year}年はうるう年です`);
  }
} else {
  console.log(`${year}年はうるう年ではありません`);
}

// else if で平らにした書き方:例外の多い条件から先に判定する
if (year % 400 === 0) {
  console.log(`${year}年はうるう年です`);
} else if (year % 100 === 0) {
  console.log(`${year}年はうるう年ではありません`);
} else if (year % 4 === 0) {
  console.log(`${year}年はうるう年です`);
} else {
  console.log(`${year}年はうるう年ではありません`);
}
// => "2026年はうるう年ではありません"(2026年に実行した場合)
// year % 4 を先に判定すると、1900年(4でも100でも割り切れる)がうるう年と誤判定される

// --------------------------------------------
// 4. switch文
// --------------------------------------------
// 値が === で一致する case から実行し、break で switch を抜ける
switch (version) {
  case "ES5":
    console.log("ECMAScript 5");
    break;
  case "ES6":
    console.log("ECMAScript 2015"); // 実行される
    break;
  case "ES7":
    console.log("ECMAScript 2016");
    break;
  default:
    console.log("知らないバージョンです"); // どの case にも一致しないとき
    break;
}

// break を書き忘れると、一致した case 以降がすべて実行される(フォールスルー)
// version が "ES6" だと、次の3行が全部表示される
// "ECMAScript 2015"
// "ECMAScript 2016"
// "知らないバージョンです"

// 関数の中で return を使う形:return した時点で関数を抜けるので break が不要
function getECMAScriptName(version) {
  switch (version) {
    case "ES5":
      return "ECMAScript 5";
    case "ES6":
      return "ECMAScript 2015";
    case "ES7":
      return "ECMAScript 2016";
    default:
      return "知らないバージョンです";
  }
}
console.log(getECMAScriptName("ES6")); // => "ECMAScript 2015"