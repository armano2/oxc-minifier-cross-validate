try {
    function f({}) {
        return 42;
    }
    var a = f();
} catch (e) {
    console.log("PASS");
}
