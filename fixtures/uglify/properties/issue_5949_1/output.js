var a = 42;
a[a = null];
try {
    a.p;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
