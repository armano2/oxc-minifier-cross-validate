(function() {
    (function f(a) {
        console.log(a);
        var g = function() {
            f(a - 1);
        };
        if (a) g();
    })(1);
})();
