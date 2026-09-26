var o = {};
o.p;
try {
    (function() {
        o.q;
    })();
    console.log("PASS");
} catch (e) {
    console.log("FAIL");
}
