(function(a) {
    while (a--)
        (function f() {
            var f = new function() {
                console.log(f);
            }();
            while (!console);
        })();
})(2);
