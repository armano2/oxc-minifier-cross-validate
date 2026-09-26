function f(t) {
    return function() {
        function r(n) {
            return n * n;
        }
        return [
            function() {
                function t(n) {
                    return n * n;
                }
                return t;
            },
            function() {
                function n(n) {
                    return n * n;
                }
                return t(n);
            }
        ];
    };
}
