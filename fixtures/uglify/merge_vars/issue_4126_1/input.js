function f(a) {
    try {
        console.log("PASS");
    } catch (e) {
        var b = a;
    } finally {
        var c = b;
    }
    console.log(c);
}
f("FAIL");
