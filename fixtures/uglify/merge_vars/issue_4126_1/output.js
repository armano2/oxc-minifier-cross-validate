function f(a) {
    try {
        console.log("PASS");
    } catch (e) {
        var b = a;
    } finally {
        var a = b;
    }
    console.log(a);
}
f("FAIL");
