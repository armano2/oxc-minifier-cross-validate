function f(a) {
    return a["foo"];
}
var o = { foo: "PASS" };
console.log(f(o));
