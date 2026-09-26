var a = {};
a = a.p;
console || a.q;
try {
    a.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
