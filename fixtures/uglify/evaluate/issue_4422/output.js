console.log(function(a) {
    a = "FAIL 1";
    arguments[0] = "PASS";
    return a;
}("FAIL 2"));
