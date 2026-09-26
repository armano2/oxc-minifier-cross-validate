!function() {
    function a() {
        return a && "a";
    }
    function b() {
        return !!b;
    }
    function c(c) {
        return c;
    }
    if (c(b(a()))) {
        function d() {}
        function e() {
            return typeof e;
        }
        function f(f) {
            return f;
        }
        console.log(a(d()), b(e()), c(f(42)), typeof d, e(), typeof f);
    }
}();
