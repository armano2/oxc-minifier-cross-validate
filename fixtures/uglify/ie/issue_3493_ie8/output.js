var c = "PASS";
(function() {
    try {
        (function a() {
            throw {};
        })();
    } catch (a) {
        a >>= 0;
        a && (c = "FAIL");
    }
})();
console.log(c);
