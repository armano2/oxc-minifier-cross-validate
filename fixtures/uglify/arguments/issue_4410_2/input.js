(function f(a) {
    console.log(arguments[0] === (a = 0) ? "FAIL" : "PASS");
})(1);
