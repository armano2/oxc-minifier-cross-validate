function f() {
    return o;
}
function g() {
    return a;
}
var a = "FAIL";
var o = {
    set FAIL(v) {
        a = f()[g()] = a = v;
    }
};
f()[g()] = "PASS";
console.log(a);
