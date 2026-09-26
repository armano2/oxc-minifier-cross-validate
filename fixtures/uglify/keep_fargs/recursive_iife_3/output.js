var a = 1, c = "PASS";
(function() {
    (function f(b, d, e) {
        a-- && f(0, 42, 0);
        e && (c = "FAIL");
        d && d.p;
    })();
})();
console.log(c);
