var o = {};
o.p;
f();
try {
    o.r;
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
function f() {
    o = null;
}
