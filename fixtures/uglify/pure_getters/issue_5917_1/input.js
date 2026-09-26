var a;
console || (a = function() {})(f);
function f() {
    a.p;
}
try {
    f();
    console.log("FAIL");
} catch (e) {
    console.log("PASS");
}
