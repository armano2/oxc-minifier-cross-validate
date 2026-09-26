console.log(function(a, b = null) {
    a = "FAIL";
    return arguments[0];
}("PASS", 42));
