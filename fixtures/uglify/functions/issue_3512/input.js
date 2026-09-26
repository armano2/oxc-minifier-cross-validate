var a = "PASS";
(function(b) {
    (function() {
        b <<= this || 1;
        b.a = "FAIL";
    })();
})();
console.log(a);
