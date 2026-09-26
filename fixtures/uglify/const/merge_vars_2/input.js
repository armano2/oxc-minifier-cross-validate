var a = 0;
(function() {
    var b = function f() {
        const c = a && f;
        c.var += 0;
    }();
    console.log(b);
})(1 && --a);
