A = "PASS";
var a;
console.log(function(b) {
    if (a = b)
        return console && a;
    a = FAIL;
    return console && a;
}(A));
