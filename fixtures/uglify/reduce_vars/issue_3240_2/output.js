(function() {
    (function f(a) {
        console.log(a);
        if (a) (function() {
            f(a - 1);
        })();
    })(1);
})();
