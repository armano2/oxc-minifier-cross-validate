var a = 1, c = "PASS";
(function() {
    function f(b, d, e) {
        a-- && f(null, 42, 0);
        e && (c = "FAIL");
        d && d.p;
    }
    var a_1 = f();
})();
console.log(c);
