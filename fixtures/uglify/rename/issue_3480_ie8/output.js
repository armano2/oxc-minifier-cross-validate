var d, a, b, c = "FAIL";
(function b() {
    (function() {
        try {
            c = "PASS";
        } catch (b) {}
    })();
})();
console.log(c);
