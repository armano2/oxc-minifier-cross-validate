var a = {};
a = a.p;
if (!console) a.q;
try {
    a.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
