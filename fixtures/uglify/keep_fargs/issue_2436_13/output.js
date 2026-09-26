var a = "PASS";
(function() {
    (function() {
        (function() {
            a && (a.null = "FAIL");
        })();
    })();
})();
console.log(a);
