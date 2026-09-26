var a = "PASS";
(function(b) {
    (function() {
        (b <<= this || 1).a = "FAIL";
    })();
})(),
console.log(a);
