var a, b;
function f() {
    return b = a = "foo";
}
var c = f();
console.log(a === b, b === c, c === a);
