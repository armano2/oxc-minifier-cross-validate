var a = 42;
function f() {
    return a - 41;
}
function g() {
    return f;
}
var b = f();
a--;
console.log(b ? "PASS" : "FAIL");
