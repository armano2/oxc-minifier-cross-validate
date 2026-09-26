var a = {};
a.p;
a.q;
a = null;
try {
    a.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
