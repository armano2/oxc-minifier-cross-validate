var a = "FAIL 1";
(function() {
    (a = "PASS")[function() {
        if (console)
            return null;
        var b = function f(a) {
            console.log("FAIL 2");
            var c = a.p;
        }();
    }()];
})();
console.log(a);
