var a = 0;
(function() {
    function f() {
        return a++;
    }
    (function() {
        (function() {
            f && f();
        })();
        (function() {
            var a = console && a;
        })();
    })();
})();
console.log(a);
