console.log(function(b, c) {
    c = "FAIL 2";
    return arguments[1];
}(...[], "FAIL 1") || "PASS");
