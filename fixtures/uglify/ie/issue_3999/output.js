(function() {
    (function f() {
        for (var o = 0; o < 2; o++)
            try {
                f[0];
            } catch (f) {
                var f = 0;
                console.log(o);
            }
    })();
})(typeof f);
