(function(a) {
    console.log(a === (a = 0) ? "FAIL" : "PASS");
})(1);
