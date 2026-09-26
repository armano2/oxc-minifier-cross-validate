var a = 0;
(function() {
    function f() {
        return a++;
    }
    void (f && a++);
    (function() {
        var a = console && a;
    })();
})();
console.log(a);
