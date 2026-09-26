function o(k) {
    return { cc: 14 }[k + "c"];
}
console.log(function f1(a, eval, c, d, e) {
    return a("c") + eval;
}(o, 28, true));
console.log(function f2(a, b, c, d, e) {
    return a + eval("c");
}(14, true, 28));
console.log(function f3(a, eval, c, d, e) {
    return a + eval("c");
}(28, o, true));
