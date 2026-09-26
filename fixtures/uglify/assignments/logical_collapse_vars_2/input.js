var a = "PASS";
(function(b) {
    b ||= (a = "FAIL", {});
    return b;
})(console).log(a);
