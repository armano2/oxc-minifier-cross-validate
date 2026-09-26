var a = "PASS";
(async function() {
    throw 42;
    a = "FAIL";
})();
console.log(a);
