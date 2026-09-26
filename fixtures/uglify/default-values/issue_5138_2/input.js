console.log(function(a, b = a = "FAIL 1") {
    return a;
}(null, "FAIL 2") || "PASS");
