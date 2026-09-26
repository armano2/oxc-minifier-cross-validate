function o(o) {
    return {
        cc: 14
    }[o + "c"];
}

console.log(function o(c, e, n, r, t) {
    return c("c") + e;
}(o, 28, true));

console.log(function f2(a, b, c, d, e) {
    return a + eval("c");
}(14, true, 28));

console.log(function f3(a, eval, c, d, e) {
    return a + eval("c");
}(28, o, true));
