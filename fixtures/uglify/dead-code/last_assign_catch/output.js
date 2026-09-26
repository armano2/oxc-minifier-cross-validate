function f() {
    try {
        throw "FAIL";
    } catch (e) {
        console.log("PASS");
    }
}
f();
