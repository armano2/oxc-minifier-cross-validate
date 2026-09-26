try {
    (function f(...[ {} ]) {})();
} catch (e) {
    console.log("PASS");
}
