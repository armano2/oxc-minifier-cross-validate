var b;
if (!console) {
    b = function() {};
    FAIL(f);
}
function f() {
    b.p;
}
try {
    f();
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
