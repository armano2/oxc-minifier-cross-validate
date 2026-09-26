function f() {
    try {
        throw "FAIL";
    } catch (e) {
        e = console.log("PASS");
    }
}
f();
