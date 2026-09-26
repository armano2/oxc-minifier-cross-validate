(function() {
    (function(f) {
        var a = 42, f = function() {};
        while (console.log(f.p || a++));
    })();
})();
