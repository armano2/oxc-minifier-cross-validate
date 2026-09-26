(function(a) {
    if (--a)
        return;
    var b;
    var a = console.log("foo") && (b = 1) ? 2 : 3;
    console.log(b, a);
})();
