var c = "FAIL";
(function() {
    function f() {
        c = "PASS";
    }
    var a = f();
    var a = function g(b) {
        b && (b.p = this);
    }(a);
})();
console.log(c);
