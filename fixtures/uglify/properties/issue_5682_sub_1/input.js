function f(a) {
    return a["foo"];
}
var o = {};
var p = "foo";
o[p] = "PASS";
console.log(f(o));
