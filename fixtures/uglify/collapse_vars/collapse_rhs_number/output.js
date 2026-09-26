var a, b;
function f() {
    return b = a = 42;
}
var c = f();
console.log(a === b, b === c, c === a);
