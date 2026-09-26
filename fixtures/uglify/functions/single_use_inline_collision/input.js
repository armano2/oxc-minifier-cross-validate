var a = "PASS";
(function() {
    var f = function() {
        while (console.log(a));
    };
    (function() {
        (function() {
            f();
        })();
        (function(a) {
            a || a("FAIL");
        })(console.log);
    })();
})();
