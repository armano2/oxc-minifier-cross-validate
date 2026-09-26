var a = "PASS", b = null;
console.log(function(c) {
    return c || (b || (c = a)) && c;
}());
