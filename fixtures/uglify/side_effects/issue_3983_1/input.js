var a = "PASS";
function f() {
    g && g();
}
f();
function g() {
    0 ? a : 0;
}
var b = a;
console.log(a);
