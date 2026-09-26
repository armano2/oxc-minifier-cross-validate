console.log(function(a, b) {
    b ?? (a = "FAIL");
    return a;
}("PASS", !console));
