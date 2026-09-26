(async function f() {
    return 42 in f();
})();
console.log("PASS");
