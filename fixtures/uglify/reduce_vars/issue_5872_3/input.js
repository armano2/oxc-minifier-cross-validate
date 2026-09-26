var a = 42;
try {
    while (new function() {
        a.p;
        a = null;
    }(a.q)) {
        a.r;
        console.log("FAIL");
    }
} catch (e) {
    console.log("PASS");
}
