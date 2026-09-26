var o = { p: [] };
function f(n) {
    return o[n];
}
function g() {
    var n = "p";
    return o.p === f(n);
}
console.log(g() ? "PASS" : "FAIL");
