var a = {};
a.p;
a = null;
try {
    a.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
