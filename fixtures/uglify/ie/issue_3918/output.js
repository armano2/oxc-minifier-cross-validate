var a;
console.log("PASS") && (a = function f() {
    f.p;
    try {
        console.log("FAIL");
    } catch (o) {}
}, a);
