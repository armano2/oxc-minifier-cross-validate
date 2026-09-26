console.log(function(a) {
    !console ?? (a = "FAIL");
    return a;
}("PASS"));
