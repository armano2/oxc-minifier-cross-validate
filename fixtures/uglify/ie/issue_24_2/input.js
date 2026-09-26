(function(a) {
    console.log(typeof function f(){} === typeof a ? "FAIL" : "PASS");
})();
