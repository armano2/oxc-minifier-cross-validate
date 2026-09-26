function f(a) {
    return "foo" in a;
}
var o = {};
var p = "foo";
o[p] = 42;
console.log(f(o) ? "PASS" : "FAIL");
