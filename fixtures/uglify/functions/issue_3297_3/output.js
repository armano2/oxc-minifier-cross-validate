function function1(c) {
    return {
        processBulk: function n(o) {
            var r, t, u = c();
            o && 0 < o.length && (r = o.shift(),
            t = function() {
                n(o);
            },
            console.log(JSON.stringify({
                param1: r,
                param2: {
                    subparam1: u,
                },
            })),
            t());
        },
    };
}
function1(function() {
    return 42;
}).processBulk([ 1, 2, 3 ]);
