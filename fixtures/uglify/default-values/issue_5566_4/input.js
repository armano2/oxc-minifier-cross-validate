(function(a, b = function() {
    return a;
}) {
    var a = 0;
    b()("PASS");
})(console.log);
