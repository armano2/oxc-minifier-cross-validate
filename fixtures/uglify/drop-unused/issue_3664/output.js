console.log(function() {
    a = (a = [ b && console.log("FAIL") ]).p = 0;
    var a, b = 0;
    return "PASS";
}());
