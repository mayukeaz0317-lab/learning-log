// ============================================
// 暗黙的な型変換(JavaScript Primer)
// ============================================
// 結論
// - JavaScriptは、演算子の都合で値の型を勝手に変換する(暗黙的な型変換)
// - 変換されても多くの場合エラーにならず、NaN や予想外の値がそのまま返る
// - 型を変換したいときは、Boolean() / String() / Number() などで明示的に変換する
// - おかしな値は暗黙の変換に任せず、チェックしてはっきりエラーにする方が安全

// --------------------------------------------
// 1. 暗黙的な型変換の例
// --------------------------------------------
console.log(1 + true); // => 2(true が 1 に変換される)
console.log(1 + "2"); // => "12"(+ は片方が文字列だと連結になる)
console.log(3 - "1"); // => 2(- は数値の計算しかないので "1" が数値になる)

// 左から順に評価されるので、並び順で結果が変わる
const a = 1;
const b = "2";
const c = 3;
console.log(a + b + c); // => "123"("12" + 3)
console.log(b + a + c); // => "213"("21" + 3)
console.log(a + c + b); // => "42"(1 + 3 = 4、4 + "2")

// === は型変換をしないので、比較では必ず === を使う

// --------------------------------------------
// 2. 真偽値への変換:Boolean()
// --------------------------------------------
// falsy な値(false, undefined, null, 0, 0n, NaN, "")は false、それ以外は true
console.log(Boolean("string")); // => true
console.log(Boolean({})); // => true(空のオブジェクトも true)
console.log(Boolean(0)); // => false
console.log(Boolean("")); // => false

// !x は「falsy かどうか」なので、undefined 以外の 0 や "" でも true になる
// 特定の値を判定したいときは === で明示的に比べる
let x;
if (x === undefined) {
  console.log("xはundefined");
}

// --------------------------------------------
// 3. 文字列への変換:String()
// --------------------------------------------
console.log(String(1)); // => "1"
console.log(String(null)); // => "null"
console.log(String([1, 2, 3])); // => "1,2,3"
console.log(String({ key: "value" })); // => "[object Object]"(中身は表示されない)

// Symbol は + で連結できないが、String() なら変換できる
// console.log("文字列" + Symbol("説明")); // => TypeError
console.log("文字列" + String(Symbol("説明"))); // => "文字列Symbol(説明)"

// --------------------------------------------
// 4. 数値への変換:Number() と parseInt / parseFloat
// --------------------------------------------
// Number():文字列全体が数値でないと NaN
console.log(Number("42")); // => 42
console.log(Number("42px")); // => NaN

// parseInt / parseFloat:先頭から読めるところまで数値にする
// parseInt の第2引数は基数(10進数なら 10)。省略せずに書く
console.log(Number.parseInt("42px", 10)); // => 42
console.log(Number.parseInt("10.5", 10)); // => 10(整数部分だけ)
console.log(Number.parseFloat("42.5px")); // => 42.5

// 変換したら、NaN になっていないかを必ず確認する
const userInput = "abc";
const num = Number.parseInt(userInput, 10);
if (Number.isNaN(num)) {
  console.log("数値に変換できなかった"); // 実行される
}
// 注意:"10任意の文字列" のように先頭が数字だと、parseInt は 10 を返して NaN にならない
// 文字列全体が数値かどうかを確かめたいなら Number() を使う

// --------------------------------------------
// 5. NaN は伝染する
// --------------------------------------------
const d = 10 + NaN; // => NaN
const e = d + 20; // => NaN(一度 NaN になると、その後の計算もすべて NaN)
console.log(e); // => NaN

// NaN は自分自身と一致しない唯一の値なので、x !== x で判定できる
function isNaNValue(value) {
  return value !== value;
}
console.log(isNaNValue(NaN)); // => true
console.log(isNaNValue("str")); // => false
// 実際の判定には Number.isNaN() を使えばよい

// --------------------------------------------
// 6. 暗黙の変換に任せず、明示的にチェックする
// --------------------------------------------
// ※ ...values、reduce、アロー関数は「関数と宣言」「配列」の章で学ぶ
// ここでは「渡した数を全部足す関数」として読めばよい

// 悪い例:undefined が混ざると、黙って NaN を返す
function sumUnsafe(...values) {
  return values.reduce((total, value) => {
    return total + value;
  }, 0);
}
let missing; // 値を入れ忘れた変数(undefined)
console.log(sumUnsafe(1, missing, 10)); // => NaN(エラーにならず、原因に気づきにくい)

// 良い例:数値以外が来たら、その場でエラーにする
function sumSafe(...values) {
  return values.reduce((total, value) => {
    if (typeof value !== "number") {
      throw new Error(`${value}はNumber型ではありません`);
    }
    return total + value;
  }, 0);
}
console.log(sumSafe(1, 2, 10)); // => 13
// console.log(sumSafe(1, missing, 10)); // => Error: undefinedはNumber型ではありません

// 空文字の判定も同じ考え方
// 悪い例:!Boolean() は falsy をすべて「空」と判定してしまう
function isEmptyStringUnsafe(str) {
  return !Boolean(str);
}
console.log(isEmptyStringUnsafe(0)); // => true(0 は文字列ではないのに「空」扱い)

// 良い例:型と長さを明示的に確かめる
function isEmptyString(str) {
  return typeof str === "string" && str.length === 0;
}
console.log(isEmptyString("")); // => true
console.log(isEmptyString(0)); // => false