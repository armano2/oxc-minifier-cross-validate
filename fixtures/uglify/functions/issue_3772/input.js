var a = "PASS";
function f() {
    return a;
}
var b = f();
function g() {
    console.log(f());
}
g();
