console.log(function() {
    var a, b;
    [ a = b = false ] = [ "FAIL" ];
    return b || "PASS";
}());
