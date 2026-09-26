var a = "FAIL";
(async function() {
    await (a = "PASS", 42);
    return "PASS";
})();
console.log(a);
