var a = "PASS", b = null;
console.log(function(c) {
    return c || (b ? c : (c = a) && c);
}());
