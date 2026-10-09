// ============================================
// 変数と宣言(JavaScript Primer)
// ============================================
// 使い分けの結論
// - 基本は const を使う
// - 再代入が必要なときだけ let を使う
// - var は使わない(古い書き方。理由は「関数とスコープ」の章で学ぶ)

// --------------------------------------------
// 1. const:再代入できない変数
// --------------------------------------------
const bookTitle = "JavaScript Primer";
console.log(bookTitle); // => "JavaScript Primer"

// 再代入しようとするとエラーになる
// bookTitle = "別の本"; // => TypeError: Assignment to constant variable.

// 宣言と同時に初期値を入れないとエラーになる
// const emptyValue; // => SyntaxError: Missing initializer in const declaration

// 1行に1つずつ宣言するのが主流
const name = "dog";
const gender = "male";
// 「,」で区切って1つのconstでまとめて宣言することもできるが、実務ではあまり使わない
// const name = "dog", gender = "male";

// constでもオブジェクトの「中身」は変更できる
// 禁止されているのは、変数 book に別の値を再代入することだけ
const book = {
  title: "JavaScript Primer",
};
book.title = "JavaScript Primer 改訂版"; // OK:プロパティの変更
console.log(book); // => { title: 'JavaScript Primer 改訂版' }
// book = { title: "別の本" }; // => TypeError: Assignment to constant variable.

// --------------------------------------------
// 2. let:再代入できる変数
// --------------------------------------------
let color = "red";
color = "blue"; // OK:再代入できる
console.log(color); // => "blue"

// 初期値なしでも宣言できる(値は undefined になる)
let count;
console.log(count); // => undefined
count = 1;
count = 2;
console.log(count); // => 2

// 同じ名前で再宣言するとエラーになる
// let color = "green"; // => SyntaxError: Identifier 'color' has already been declared

// --------------------------------------------
// 3. var:古い書き方(今は使わない)
// --------------------------------------------
var size;
size = "small";
size = "large";
console.log(size); // => "large"

// varだけは同じ名前で再宣言できてしまう(再代入とは別)
// 意図せず値を上書きする原因になる
var food = "rice";
var food = "bread";
console.log(food); // => "bread"