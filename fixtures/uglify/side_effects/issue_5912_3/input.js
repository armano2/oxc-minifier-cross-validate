var a = {};
a = a.p;
try {
    console;
} catch (e) {
    a.q;
}
try {
    a.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
