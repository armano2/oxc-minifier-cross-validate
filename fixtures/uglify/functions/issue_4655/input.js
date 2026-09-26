(function f() {
    while (console.log("PASS")) {
        var g = function() {};
        for (var a in g)
            g();
    }
})();
