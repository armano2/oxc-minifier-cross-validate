var a = 0, b = 0;
(function f(c) {
    var bar_1 = (b = 1 + ++b, c = 0);
    a-- && f();
})();
console.log(b);
