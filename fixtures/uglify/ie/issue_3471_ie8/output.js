var c = 1;
(function f() {
    var a = function g() {
        --c && f();
        g.p = 0;
    };
    for (var p in a)
        a[p];
})();
