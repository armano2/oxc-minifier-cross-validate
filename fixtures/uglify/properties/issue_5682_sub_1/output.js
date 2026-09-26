function f(o) {
    return o["foo"];
}
var o = {};
var p = "foo";
o[p] = "PASS";
console.log(f(o));
