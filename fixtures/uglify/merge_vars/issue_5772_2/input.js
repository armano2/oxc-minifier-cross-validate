(function(a) {
    while (--a)
        return;
    var b;
    var c = console.log("foo") && (b = 1) ? 2 : 3;
    console.log(b, c);
})();
