var a, b;
function f() {
    return b = a = f;
}
var c = f();
console.log(a === b, b === c, c === a);
