var a, b = 1, c = 0, log = console.log;
(function() {
    a = b = "PASS";
})((b = "FAIL", c++));
log(a, b);
