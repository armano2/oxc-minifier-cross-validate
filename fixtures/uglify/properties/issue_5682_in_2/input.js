function f(a) {
    return "foo" in a;
}
var o = { foo: 42 };
console.log(f(o) ? "PASS" : "FAIL");
