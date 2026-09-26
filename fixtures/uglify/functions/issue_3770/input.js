(function() {
    function f(a, a) {
        var b = function() {
            return a || "PASS";
        }();
        console.log(b);
    }
    f("FAIL");
})();
