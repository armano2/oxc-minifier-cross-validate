var a = "FAIL";
try {
    (function() {
        a = "PASS";
        (void ((void 0).p = 0))[!1];
    })();
} catch (e) {}
console.log(a);
