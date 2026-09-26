A = this;
(function() {
    (function(a = console.log(this === A ? "PASS" : "FAIL")) {})();
})();
