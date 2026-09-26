var a = "FAIL";
try {
    throw "PASS";
} catch (a) {
    function f() {
        return a;
    }
    console.log(a);
}
f();
