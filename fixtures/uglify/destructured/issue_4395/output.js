console.log(function(a, {}) {
    a = "FAIL";
    return arguments[0];
}("PASS", 42));
