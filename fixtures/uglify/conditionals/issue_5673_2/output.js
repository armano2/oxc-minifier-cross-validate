var a = "PASS";
console.log(function(b) {
    return a || (b = a) && b;
}());
