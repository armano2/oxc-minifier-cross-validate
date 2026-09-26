var a = 42;
try {
    while (!function f() {
        a.p;
        a = null;
    }(a.q)) {
        a.r;
        console.log("FAIL");
    }
} catch (e) {
    console.log("PASS");
}
