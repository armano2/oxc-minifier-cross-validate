var a = 0;
var b = function(c) {
    for (var i = 2; --i >= 0;) {
        (function() {
            c = 0;
            var f = f && f[void 0];
        })();
        a += b;
        c && b++;
    }
}(b = 1);
console.log(a);
