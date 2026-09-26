var a = "FAIL";
!function(c) {
    var d = 1;
    for (;c && (a = "PASS") && 0 < --d;);
}(a);
console.log(a);
