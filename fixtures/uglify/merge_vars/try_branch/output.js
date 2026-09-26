console.log(function(a) {
    var b = "FAIL", c;
    try {
        a && F();
    } catch (e) {
        c = b;
    }
    return c || "PASS";
}());
