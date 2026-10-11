// ============================================
// 演算子(JavaScript Primer)
// ============================================
// 結論
// - 比較は必ず === と !== を使う(== と != は使わない。例外は == null だけ)
// - オブジェクトの比較は「中身」ではなく「同じもの(参照)かどうか」
// - && と || は true/false ではなく、左辺か右辺の「値」を返す
// - デフォルト値を決めるとき、0 や "" を有効な値として残したいなら ?? を使う

// --------------------------------------------
// 1. 算術演算子
// --------------------------------------------
console.log(1 + 1); // => 2
console.log("文字列" + "結合"); // => "文字列結合"(文字列同士の + は連結)
console.log(8 / 2); // => 4
console.log(10 / 0); // => Infinity(エラーにはならない)
console.log(8 % 3); // => 2(割り算の余り)
console.log(2 ** 4); // => 16(べき乗)

// NaN:数値に変換できなかったときの値。Number型だが「数値ではない」
console.log(-"文字列"); // => NaN
console.log(typeof NaN); // => "number"
console.log(NaN === NaN); // => false(自分自身とも一致しない)
console.log(Number.isNaN(NaN)); // => true(NaNの判定はこれを使う)

// --------------------------------------------
// 2. インクリメント・デクリメント
// --------------------------------------------
// 後置(x++):先に今の値を返してから、1増やす
let x = 1;
console.log(x++); // => 1
console.log(x); // => 2

// 前置(++y):先に1増やしてから、その値を返す
let y = 1;
console.log(++y); // => 2
console.log(y); // => 2
// -- も同じ考え方で、1減らす

// --------------------------------------------
// 3. 比較演算子
// --------------------------------------------
// 厳密等価(===):型も値も同じなら true
console.log(1 === 1); // => true
console.log(1 === "1"); // => false
console.log(1 !== "1"); // => true

// オブジェクトは「同じものを指しているか」で比較される
const objA = {};
const objB = {};
console.log(objA === objB); // => false(中身が同じでも別のオブジェクト)
console.log(objA === objA); // => true

// 等価(==):型が違うと暗黙的に変換してから比較するので、予想外の結果になる
console.log(1 == "1"); // => true
console.log(1 == "01"); // => true
console.log(0 == false); // => true
console.log(0 == null); // => false

// == を使ってよい唯一の例外:null と undefined をまとめて判定するとき
const value = undefined;
if (value == null) {
  console.log("valueがnullまたはundefined"); // 実行される
}
// === で書くとこうなる(意味は同じ)
// if (value === null || value === undefined) { ... }

// 大小比較
console.log(42 > 21); // => true
console.log(42 >= 42); // => true

// --------------------------------------------
// 4. 分割代入
// --------------------------------------------
// 配列:順番どおりに取り出す
const [d, e] = [1, 2];
console.log(d, e); // => 1 2

// オブジェクト:プロパティ名と同じ名前の変数に取り出す
const { key, size } = { key: "value", size: "small" };
console.log(key, size); // => "value" "small"

// --------------------------------------------
// 5. 論理演算子
// --------------------------------------------
// falsy な値(真偽値に変換すると false になる値)は次の7つだけ
// false, undefined, null, 0, 0n, NaN, ""(空文字)
// それ以外はすべて truthy

// && :左辺が falsy ならそのまま左辺を返し、truthy なら右辺を返す
console.log(true && "右辺の値"); // => "右辺の値"
console.log(0 && "右辺の値"); // => 0
console.log("" && "右辺の値"); // => ""

// || :左辺が truthy ならそのまま左辺を返し、falsy なら右辺を返す
console.log(42 || "右辺の値"); // => 42
console.log(0 || "左辺はfalsy"); // => "左辺はfalsy"

// 短絡評価:結果が左辺で決まると、右辺は実行されない
false && console.log("実行されない");
true || console.log("実行されない");

// ! :真偽値を反転する。!! で真偽値に変換できる
console.log(!0); // => true
console.log(!!""); // => false

// 条件の組み合わせ
const word = "str";
if (typeof word === "string" && word === "str") {
  console.log(`${word} is string value`);
}

// --------------------------------------------
// 6. Nullish coalescing演算子(??)
// --------------------------------------------
// ?? :左辺が null か undefined のときだけ右辺を返す
console.log(null ?? "右辺の値"); // => "右辺の値"
console.log(0 ?? "右辺の値"); // => 0
console.log(false ?? "右辺の値"); // => false

// || と ?? の使い分け
// - falsy な値すべてを除外したい → ||
// - null と undefined だけを除外したい → ??
const inputCount = 0; // 0 は有効な入力として扱いたい
console.log(inputCount || 10); // => 10(0 が消えてしまう)
console.log(inputCount ?? 10); // => 0(0 が残る)

// --------------------------------------------
// 7. 条件(三項)演算子
// --------------------------------------------
// 条件式 ? trueのときの値 : falseのときの値
const result = true ? "A" : "B";
console.log(result); // => "A"

// if文と違って「値を返す」ので、const の初期値に使える
function addPrefix(text, prefix) {
  const pre = typeof prefix === "string" ? prefix : "デフォルト";
  return pre + text;
}
console.log(addPrefix("文字列", "カスタム")); // => "カスタム文字列"
console.log(addPrefix("文字列")); // => "デフォルト文字列"

// --------------------------------------------
// 8. グループ化演算子 ()
// --------------------------------------------
// () の中が先に計算される
console.log(1 + 2 * 3); // => 7
console.log((1 + 2) * 3); // => 9