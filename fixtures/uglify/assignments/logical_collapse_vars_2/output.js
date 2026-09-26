var a = "PASS";
(function(b) {
    return b ||= (a = "FAIL", {});
})(console).log(a);
