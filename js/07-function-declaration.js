// ============================================
// 関数と宣言(JavaScript Primer)
// ============================================
// 結論
// - 関数は「処理をまとめて、名前を付けて何度も呼び出せるようにしたもの」
// - 関数は値として扱える(変数に代入したり、別の関数に渡したりできる)
// - 基本は const + Arrow Function で書く(上書き事故を防げて、短く書ける)
// - デフォルト値は || ではなく、デフォルト引数か ?? で指定する
// - 可変長引数は arguments ではなく Rest parameters(...args)を使う

// --------------------------------------------
// 1. 関数宣言と返り値
// --------------------------------------------
function double(num) {
  return num * 2;
}
console.log(double(10)); // => 20

// return の後ろに何も書かない、または return 自体がないと undefined を返す
function noReturn() {}
console.log(noReturn()); // => undefined

// --------------------------------------------
// 2. 引数の数が合わないとき
// --------------------------------------------
// 少ないとき:足りない仮引数は undefined になる
function argumentsToArray(x, y) {
  return [x, y];
}
console.log(argumentsToArray(1)); // => [1, undefined]

// 多いとき:あふれた引数は無視される
function add(x, y) {
  return x + y;
}
console.log(add(1, 2, 3)); // => 3

// --------------------------------------------
// 3. デフォルト値の指定
// --------------------------------------------
// デフォルト引数:引数が渡されなかった(undefined の)ときだけ使われる
function echo(x = "デフォルト値") {
  return x;
}
console.log(echo()); // => "デフォルト値"
console.log(echo(null)); // => null(null は「渡された」扱いなので使われない)

// || は falsy な値(0 や "")でもデフォルト値になってしまう → 使わない
function addPrefixOr(text, prefix) {
  const pre = prefix || "デフォルト:";
  return pre + text;
}
console.log(addPrefixOr("文字列", "")); // => "デフォルト:文字列"(空文字が無視される)

// ?? は null と undefined のときだけデフォルト値になる
function addPrefix(text, prefix) {
  const pre = prefix ?? "デフォルト:";
  return pre + text;
}
console.log(addPrefix("文字列", "")); // => "文字列"
console.log(addPrefix("文字列", null)); // => "デフォルト:文字列"

// --------------------------------------------
// 4. 可変長引数:Rest parameters と Spread構文
// --------------------------------------------
// Rest parameters(...args):渡された引数を「本物の配列」として受け取る
function logArgs(first, ...rest) {
  console.log(first); // => "a"
  console.log(rest); // => ["b", "c"]
}
logArgs("a", "b", "c");
// 仮引数の最後にしか置けない

// Spread構文(...array):配列を展開して、1つずつ引数として渡す
function logXYZ(x, y, z) {
  console.log(x, y, z); // => 1 2 3
}
const numbers = [1, 2, 3];
logXYZ(...numbers); // logXYZ(numbers[0], numbers[1], numbers[2]) と同じ

// arguments は使わない
// - 配列のメソッドが使えない(配列もどき)
// - 仮引数を見ても、何個受け取る関数なのか分からない
// - Arrow Function では使えない

// --------------------------------------------
// 5. 引数の分割代入
// --------------------------------------------
const user = { id: 42 };

// オブジェクトを受け取って、必要なプロパティだけ取り出す
function printUserId({ id }) {
  console.log(id); // => 42
}
printUserId(user);

// 配列も同じように取り出せる
function printFirstTwo([first, second]) {
  console.log(first, second); // => "1" "2"
}
printFirstTwo(["1", "2"]);

// --------------------------------------------
// 6. 関数は値(ファーストクラスファンクション)
// --------------------------------------------
function greet() {
  console.log("greetが呼び出されました");
}
const myFunc = greet; // () を付けないと、呼び出さずに関数そのものを代入する
myFunc(); // => "greetが呼び出されました"

// 関数式:関数を値として変数に代入する
// 名前を付けると、関数の中から自分自身を呼び出せる(再帰)
const factorial = function innerFact(n) {
  if (n === 0) {
    return 1;
  }
  return n * innerFact(n - 1);
};
console.log(factorial(3)); // => 6(3 × 2 × 1)

// --------------------------------------------
// 7. Arrow Function
// --------------------------------------------
const square1 = (x) => {
  return x * x;
};
// 処理が1つの式だけなら、{} と return を省略できる
const square2 = (x) => x * x;
console.log(square2(3)); // => 9
// 仮引数が1つなら () も省略できる(x => x * x)が、Prettierは () を付けて整形する

// 特徴:常に無名関数 / arguments を使えない / this の扱いが分かりやすい(後の章)
// → 基本は Arrow Function を使い、できないことがあるときだけ function を使う

// --------------------------------------------
// 8. 同じ名前の関数宣言は上書きされる
// --------------------------------------------
function overwritten(x) {
  return x;
}
function overwritten(x) {
  return x * 2;
}
console.log(overwritten(2)); // => 4(後に書いたほうで上書きされる)

// const なら同じ名前を定義した時点でエラーになり、上書き事故を防げる
// const square2 = (x) => x * 2; // => SyntaxError: Identifier 'square2' has already been declared

// --------------------------------------------
// 9. コールバック関数
// --------------------------------------------
// 引数として渡す関数をコールバック関数と呼ぶ
const array = [1, 2, 3];

// map:各要素をコールバック関数で変換した、新しい配列を返す
const doubled = array.map((value) => value * 2);
console.log(doubled); // => [2, 4, 6]

// forEach:各要素に対して、コールバック関数を1回ずつ呼び出す
array.forEach((value) => {
  console.log(value); // => 1, 2, 3 の順に表示
});

// --------------------------------------------
// 10. メソッド
// --------------------------------------------
// オブジェクトのプロパティになっている関数をメソッドと呼ぶ
// メソッドは短縮記法で書く(クラスのメソッドと同じ書き方)
const obj = {
  method() {
    return "this is method";
  },
};
console.log(obj.method()); // => "this is method"