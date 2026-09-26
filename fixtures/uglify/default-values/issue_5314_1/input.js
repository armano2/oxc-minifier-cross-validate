A = this;
new function() {
    (function(a = console.log(this === A ? "PASS" : "FAIL")) {})();
}();
