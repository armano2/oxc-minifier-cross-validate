console.log(function(a) {
    var b = "FAIL", c;
    a ? (c = b) : void 0;
    return c || "PASS";
}());
