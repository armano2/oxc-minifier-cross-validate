try {
    (function(a) {
        A = 42;
        a || A;
    })(!(0 == 42 >> 0o644n));
} catch (e) {
    console.log("PASS");
}
