var a = "PASS";
(function(b = a = "FAIL") {
    console.log(a, b);
})(42);
