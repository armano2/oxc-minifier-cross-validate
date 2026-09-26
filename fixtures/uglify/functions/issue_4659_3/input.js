var a = 0;
(function() {
    function f() {
        return a++;
    }
    (function() {
        function g() {
            while (!console);
        }
        g(f && f());
        (function() {
            var a = console && a;
        })();
    })();
})();
console.log(a);
