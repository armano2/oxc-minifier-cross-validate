A = 0;
do {
    var a, b = A;
    for (a in b)
        var c = b;
} while (function() {
    var d;
    console.log(d *= A);
}());
