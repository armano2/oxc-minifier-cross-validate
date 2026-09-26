var a = "FAIL";
(function(b) {
    (function(c) {
        var d = 1;
        for (;c && (a = "PASS") && 0 < --d;);
    })(b);
})(a);
console.log(a);
