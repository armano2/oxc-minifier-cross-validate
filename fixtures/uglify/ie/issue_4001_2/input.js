console.log(function(a) {
    function f() {
        return a;
        var b;
    }
    var c = f();
    (function g() {
        c[42];
        f;
    })();
    (function a() {});
}(42));
