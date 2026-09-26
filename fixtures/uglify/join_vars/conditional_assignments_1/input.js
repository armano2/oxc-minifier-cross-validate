function f(b, c, d) {
    var a = b;
    if (c) a = d;
    return a;
}
function g(b, c, d) {
    var a = b;
    if (c); else a = d;
    return a;
}
console.log(f("FAIL", 1, "PASS"), g("PASS", 1, "FAIL"));
