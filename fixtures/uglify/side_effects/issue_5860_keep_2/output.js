a = {};
a.p;
var a = null;
try {
    a.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
