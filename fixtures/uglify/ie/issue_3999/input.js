(function() {
    (function f() {
        for (var i = 0; i < 2; i++)
            try {
                f[0];
            } catch (f) {
                var f = 0;
                console.log(i);
            }
    })();
})(typeof f);
