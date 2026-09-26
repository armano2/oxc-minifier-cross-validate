function f() {
    return a;
}
var a = "FAIL";
var o = {
    set FAIL(v) {
        a = o[f()] = a = v;
    }
};
o[f()] = "PASS";
console.log(a);
