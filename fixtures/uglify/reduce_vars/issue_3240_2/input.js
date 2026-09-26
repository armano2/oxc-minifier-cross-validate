(function() {
    f(1);
    function f(a) {
        console.log(a);
        var g = function() {
            f(a - 1);
        };
        if (a) g();
    }
})();
