var s = 2, c = 0;
(function n(r, o, a) {
    try {
        for (var f = 1; f-- >0;)
            var t = function(r) {
                (function(r) {
                    r && r[t++];
                })(--s >= 0 && n(c++));
                for (var o = 1; --o > 0;);
            }();
    } catch (o) {
        try {
            return;
        } catch (r) {
            for (var v = 1; --v > 0;)
                for (var i = 1; i > 0;--i) {
                    function u() {}
                    for (var v in u);
                }
        }
    }
})();
console.log(c);
