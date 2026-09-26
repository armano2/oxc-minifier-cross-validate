try {
    (function f(a) {
        f();
    })();
} catch (e) {
    console.log("PASS");
}
