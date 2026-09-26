var a = 0;
(function() {
    function f() {
        return a++;
    }
    f && a++;
    (function() {
        var a = console && a;
    })();
})();
console.log(a);
