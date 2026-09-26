try {
    (function(a) {
        0 != (A = 42) >> 0o644n || A;
    })();
} catch (e) {
    console.log("PASS");
}
