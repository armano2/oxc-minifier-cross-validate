console.log(function(a = "FAIL") {
    return arguments[0];
}() || "PASS");
