var o = {};
o.p;
o = null;
try {
    (function() {
        o.q;
    })();
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
