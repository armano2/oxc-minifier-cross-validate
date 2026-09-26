console.log(function(a) {
    var b = "FAIL", c;
    if (a) c = b;
    return c || "PASS";
}());
