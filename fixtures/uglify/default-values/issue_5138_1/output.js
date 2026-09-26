console.log(function(a, b = a = "FAIL") {
    return a;
}() && "PASS");
