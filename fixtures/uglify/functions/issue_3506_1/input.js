var a = "FAIL";
(function(b) {
    (function(b) {
        b && (a = "PASS");
    })(b);
})(a);
console.log(a);
