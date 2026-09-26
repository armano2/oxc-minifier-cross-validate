console.log(function(a) {
    var b = a;
    a++;
    ({ p: b[0] } = { p: "foo" });
    return a;
}([]) ? "PASS" : "FAIL");
