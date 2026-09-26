(function(a) {
    while (--a)
        return;
    var b = console.log("foo") && (c = 42) ? 0 : console.log(c);
    var c = b;
})();
