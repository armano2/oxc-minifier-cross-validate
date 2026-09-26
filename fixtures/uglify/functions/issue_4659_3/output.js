var a = 0;
(function() {
    function f() {
        return a++;
    }
    f && a++;
    while (!console);
    (function() {
        var a = console && a;
    })();
})();
console.log(a);
