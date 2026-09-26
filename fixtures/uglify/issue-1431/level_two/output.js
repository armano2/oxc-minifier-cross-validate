function f(t) {
    return function() {
        function r(n) {
            return n * n;
        }
        return function() {
            function n(n) {
                return n * n;
            }
            return t(n);
        };
    };
}
