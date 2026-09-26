var o = { p: {} };
(function(a) {
    console && a;
    if (console) {
        a = a.p;
        a.q = a;
    }
})(o);
console.log(o.p.q === o.p ? "PASS" : "FAIL");
