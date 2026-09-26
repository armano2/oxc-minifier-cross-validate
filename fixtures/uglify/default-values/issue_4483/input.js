if (console)
    var [ a = "FAIL" ] = [], b = a = "PASS";
console.log(b);
