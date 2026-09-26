var s = 2, c = 0;
(function o() {
    try {
        for (var r = 1; r-- > 0;)
            var n = function() {
                (function(r) {
                    r && r[n++];
                })(--s >= 0 && o(c++));
                for (var r = 1; --r > 0;);
            }();
    } catch (r) {
        try {
            return;
        } catch (r) {
            for (var a = 1; --a > 0;)
                for (var f = 1; f > 0; --f) {
                    function t() {}
                    for (var a in t);
                }
        }
    }
})();
console.log(c);
