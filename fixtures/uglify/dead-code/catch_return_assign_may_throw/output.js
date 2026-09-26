function f() {
    try {
        throw "FAIL";
    } catch (e) {
        return console.log("PASS");
    }
}
f();
