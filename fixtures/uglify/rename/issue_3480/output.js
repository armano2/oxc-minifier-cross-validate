var d, a, b, c = "FAIL";
(function n() {
    (function() {
        try {
            c = "PASS";
        } catch (c) {}
    })();
})();
console.log(c);
