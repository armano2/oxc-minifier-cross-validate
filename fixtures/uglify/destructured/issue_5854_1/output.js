console.log(function(a) {
    var b = a;
    a++;
    [ b[0] ] = [ "foo" ];
    return a;
}([]) ? "PASS" : "FAIL");
