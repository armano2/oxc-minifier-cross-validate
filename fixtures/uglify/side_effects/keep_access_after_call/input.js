var o = {};
o.p;
o.q;
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
