var o = { p: {} };
(function(a) {
    console;
    if (console)
        (a = a.p).q = a;
})(o);
console.log(o.p.q === o.p ? "PASS" : "FAIL");
