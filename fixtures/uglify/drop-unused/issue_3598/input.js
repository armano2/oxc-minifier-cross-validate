var a = "FAIL";
try {
    (function() {
        var b = void 0;
        a = "PASS";
        c.p = 0;
        var c = b[!1];
    })();
} catch (e) {}
console.log(a);
