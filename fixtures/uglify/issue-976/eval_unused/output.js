function o(k) {
    return { c: 14 }[k];
}
console.log(function(a, eval) {
    return a("c") + eval;
}(o, 28));
console.log(function f2(a, b, c, d, e) {
    return a + eval("c");
}(14, true, 28));
console.log(function f3(a, eval, c, d, e) {
    return a + eval("c");
}(28, o, true));
