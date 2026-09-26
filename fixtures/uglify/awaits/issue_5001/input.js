var a = 0;
(async function() {
    a++ | await 42;
})();
console.log(a ? "PASS" : "FAIL");
