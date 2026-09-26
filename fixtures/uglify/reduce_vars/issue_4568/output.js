(function(a) {
    for (a && console.log("FAIL"), 1; console.log("PASS"); ) 1;
})(!(0 !== delete NaN));
