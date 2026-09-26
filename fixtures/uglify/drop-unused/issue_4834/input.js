try {
    new function(a, b) {
        b;
        b.p;
    }(42);
} catch (e) {
    console.log("PASS");
}
