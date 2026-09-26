function f() {
    return o;
}
function g() {
    return a;
}
function h(v) {
    a = f()[g()] = a = v;
}
var a = "FAIL";
var o = {
    set FAIL(v) {
        h(v);
    }
};
o.FAIL = "PASS";
console.log(a);
