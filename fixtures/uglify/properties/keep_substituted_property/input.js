var o = { p: [] };
function f(b) {
    return o[b];
}
function g() {
    var a = "p";
    return o[a] === f(a);
}
console.log(g() ? "PASS" : "FAIL");
