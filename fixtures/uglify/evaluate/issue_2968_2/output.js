var c = "FAIL";
(function() {
    a = 42,
    ((a <<= 0) && (a[(c = "PASS", 0)] = 0));
    var a;
})();
console.log(c);
