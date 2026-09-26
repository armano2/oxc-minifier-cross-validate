function f() {
    try {
        throw "FAIL";
    } catch (e) {
        return e = console.log("PASS");
    }
}
f();
