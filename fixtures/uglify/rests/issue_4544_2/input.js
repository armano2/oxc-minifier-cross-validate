try {
    (function f(a, ...[ {} ]) {})([]);
} catch (e) {
    console.log("PASS");
}
