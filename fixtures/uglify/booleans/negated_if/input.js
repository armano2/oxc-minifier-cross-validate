console.log(function(a) {
    if (!a)
        return a ? "FAIL" : "PASS";
}(!console));
