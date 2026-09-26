var a = 0;
(function() {
    function f(b) {
        b = a = 1 + a;
        a = 1 + a;
        console.log(b);
    }
    f();
})();
console.log(a);
