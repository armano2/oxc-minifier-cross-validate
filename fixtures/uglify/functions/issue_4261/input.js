try {
    throw 42;
} catch (e) {
    (function() {
        function f() {
            e.p;
        }
        function g() {
            while (f());
        }
        (function() {
            while (console.log(g()));
        })();
    })();
}
