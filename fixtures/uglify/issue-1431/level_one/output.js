function f(r) {
    return function() {
        function n(n) {
            return n * n;
        }
        return r(n);
    };
}
