A = this;
new function() {
    ((a = console.log(this === A ? "FAIL" : "PASS")) => {})();
}();
