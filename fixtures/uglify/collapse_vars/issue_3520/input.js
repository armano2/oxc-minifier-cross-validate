var a = 0;
var b = function(c) {
    for (var i = 2; --i >= 0;) {
        (function f() {
            c = 0;
            var i = void 0;
            var f = f && f[i];
        })();
        a += b;
        c && b++;
    }
}(b = 1);
console.log(a);
