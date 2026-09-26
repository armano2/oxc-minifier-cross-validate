var c = "FAIL";
(function() {
    function f() {
        c = "PASS";
    }
    (function(b) {
        b && (b.p = this);
    })(f());
})();
console.log(c);
