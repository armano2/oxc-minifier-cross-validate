var a = "FAIL";
(function(b) {
    var c = a;
    var d = 1;
    for (;c && (a = "PASS") && 0 < --d;);
})();
console.log(a);
