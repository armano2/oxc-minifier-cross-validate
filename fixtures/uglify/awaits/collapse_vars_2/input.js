var a = "FAIL";
(async function() {
    await (a = "PASS");
    return "PASS";
})();
console.log(a);
