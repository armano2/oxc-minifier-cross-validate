console.log(function f(a) {
    var b = "fooPASS";
    for (var c in f, b)
        b.p;
    return "PASS";
}());
