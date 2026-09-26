console.log(function(a) {
    var b = "FAIL", c;
    a && (c = b);
    return c || "PASS";
}());
