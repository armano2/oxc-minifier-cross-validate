var s = 2, a = 100, b = 10, c = 0;
function f(p, e, r) {
    try {
        for (var i = 1; i-- > 0;)
            var a = function(x) {
                function g(y) {
                    y && y[a++];
                }
                var x = g(--s >= 0 && f(c++));
                for (var j = 1; --j > 0;);
            }();
    } catch (e) {
        try {
            return;
        } catch (z) {
            for (var k = 1; --k > 0;) {
                for (var l = 1; l > 0; --l) {
                    var n = function() {};
                    for (var k in n)
                        var o = (n, k);
                }
            }
        }
    }
}
var r = f();
console.log(c);
