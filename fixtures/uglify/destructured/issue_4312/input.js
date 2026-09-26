var a;
(function f(b, c) {
    return function({
        [a = b]: d,
    }) {}(c && c);
})("PASS", "FAIL");
console.log(a);
