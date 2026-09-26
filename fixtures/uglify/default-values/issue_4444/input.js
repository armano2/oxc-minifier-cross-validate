var a = "PASS";
console.log(function(b) {
    b = a;
    (function(c = b.p) {})();
    return a;
}());
