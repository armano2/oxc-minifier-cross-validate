(function() {
    for (var a in [ 1, 2 ])
        try {
            return function() {
                (function f(b) {
                    b[b = 42];
                })();
                while (!console);
            }();
        } catch (e) {
            console.log("foo");
        }
})();
