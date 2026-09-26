var a = "PASS";
console.log(function(b) {
    return (b = a) ? b : (b = a) && b;
}());
