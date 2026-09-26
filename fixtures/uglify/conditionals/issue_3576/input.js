var c = "FAIL";
(function(a) {
    (a = -1) ? (a && (a.a = 0)) : (a && (a.a = 0));
    a && a[c = "PASS"]++;
})();
console.log(c);
