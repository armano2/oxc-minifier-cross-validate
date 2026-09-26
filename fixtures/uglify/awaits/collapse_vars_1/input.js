var a = "FAIL";
(async function() {
    a = "PASS";
    await 42;
    return "PASS";
})();
console.log(a);
