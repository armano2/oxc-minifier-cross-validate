function function1(o) {
    return {
        processBulk: function t(u) {
            var r = o();
            function n(n) {
                var o = {
                    subparam1: r
                };
                c({
                    param1: n,
                    param2: o
                }, function() {
                    t(u);
                });
            }
            u && u.length > 0 && n(u.shift());
        }
    };
    function c(n, o) {
        console.log(JSON.stringify(n));
        o();
    }
}
function1(function() {
    return 42;
}).processBulk([ 1, 2, 3 ]);
