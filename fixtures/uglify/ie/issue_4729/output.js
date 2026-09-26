try {
    f;
} catch (e) {
    (function f() {});
    console.log("PASS");
}
