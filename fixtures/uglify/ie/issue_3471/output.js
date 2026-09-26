var c = 1;
(function f() {
    function a() {
        --c && f();
        a.p = 0;
    }
    for (var p in a)
        a[p];
})();
