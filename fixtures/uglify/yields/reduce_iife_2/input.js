var a = "PASS";
(function*() {
    a = "FAIL";
})();
console.log(a);
