(function(a) {
    a && console.log("FAIL");
    if (1)
        do {
            if (!console.log("PASS")) break;
        } while (1);
})(!(0 !== delete NaN));
