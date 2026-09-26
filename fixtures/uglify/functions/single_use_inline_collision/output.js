var a = "PASS";
(function() {
    void function() {
        while (console.log(a));
    }();
    (function(a) {
        a || a("FAIL");
    })(console.log);
    return;
})();
