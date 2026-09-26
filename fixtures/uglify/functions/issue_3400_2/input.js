(function(f) {
    console.log(f()()[0].p);
})(function() {
    function g() {
        function h(u) {
            var o = {
                p: u
            };
            return console.log(o[g]), o;
        }
        function e() {
            return [ 42 ].map(function(v) {
                return h(v);
            });
        }
        return e();
    }
    return g;
});
