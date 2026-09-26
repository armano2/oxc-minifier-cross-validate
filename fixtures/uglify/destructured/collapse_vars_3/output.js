console.log(function(a) {
    [ a ] = (a = "FAIL", [ "PASS" ]);
    return a;
}());
