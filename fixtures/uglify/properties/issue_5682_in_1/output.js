function f(o) {
    return "foo" in o;
}
var o = {};
var p = "foo";
o[p] = 42;
console.log(f(o) ? "PASS" : "FAIL");
