try {
    function f(a) {
        var a = f(1234);
    }
    f();
} catch (e) {
    console.log("PASS");
}
