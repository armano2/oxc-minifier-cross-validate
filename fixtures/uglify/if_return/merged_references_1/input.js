var a, b = "PASS";
console.log(function(c) {
    if (c = b)
        return a || c;
    c = FAIL;
    return a || c;
}());
