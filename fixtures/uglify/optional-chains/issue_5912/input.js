var a, b = {};
b = b.p;
a?.[b.q];
try {
    b.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
