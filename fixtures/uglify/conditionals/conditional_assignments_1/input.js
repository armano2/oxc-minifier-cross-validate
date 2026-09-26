function f(a, b, c, d) {
    a = b;
    if (c) a = d;
    return a;
}
function g(a, b, c, d) {
    a = b;
    if (c); else a = d;
    return a;
}
console.log(f(0, "FAIL", 1, "PASS"), g(0, "PASS", 1, "FAIL"));
