(function(a) {
    if (--a)
        return;
    var a = console.log("foo") && (c = 42) ? 0 : console.log(c);
    var c = a;
})();
