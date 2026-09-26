console.log(typeof function() {
    return function() {
        function f() {
            if (1)
                g();
            else
                (function() {
                    return f;
                });
        }
        return f;
        function g() {
            if (1) {
                if (0)
                    h;
                else
                    h();
                var key = 0;
            }
        }
        function h() {
            return factory;
        }
    };
}()());
