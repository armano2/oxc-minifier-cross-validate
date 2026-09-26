var a;
(async function() {
    a = "PASS";
    await delete a.p;
    a = "FAIL";
})();
console.log(a);
