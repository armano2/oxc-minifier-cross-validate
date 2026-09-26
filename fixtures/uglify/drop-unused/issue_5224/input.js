function f() {
    try {
        var b = function() {
            var a = "FAIL 1";
            null && a;
            a = console.log(a);
        }(new function(c, d) {
            console.log(d);
            a;
        }("FAIL 2", Infinity));
    } finally {
        return f;
    }
}
f();
