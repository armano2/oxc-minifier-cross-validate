var a, b = 0;
(function() {
    a = b;
    a++;
    while (b++);
})();
console.log(a ? "PASS" : "FAIL");
