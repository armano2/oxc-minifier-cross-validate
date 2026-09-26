do {
    var a = {};
    for (A in a)
        a;
} while (function() {
    console.log(b);
    var b = b;
}());
