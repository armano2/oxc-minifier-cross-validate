var a = "PASS";
(function(b) {
    b = b && (a = "FAIL");
})();
console.log(a);
