(function() {
    var a, b;
    a = 42;
    do {
        b = { 0: a++ };
    } while (console.log(b[b ^= 0]));
})();
