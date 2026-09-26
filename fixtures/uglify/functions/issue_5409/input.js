(function(a) {
    (a = console) || FAIL(a);
    (function(b) {
        console.log(b && b);
        while (!console);
    })();
})();
