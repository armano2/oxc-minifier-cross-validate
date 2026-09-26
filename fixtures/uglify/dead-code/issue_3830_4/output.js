function f() {
    return o;
}
var a = "FAIL";
var o = {
    set FAIL(v) {
        a = f()[a] = a = v;
    }
};
f()[a] = "PASS";
console.log(a);
