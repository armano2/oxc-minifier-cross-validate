function f() {
    a.p;
    a = null;
}

var a = 42;
try {
    while (!f(a.q)) {
        a.r;
        console.log("FAIL");
    }
} catch (e) {
    console.log("PASS");
}
