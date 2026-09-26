while (function() {
    function f(a) {
        var b = 42, c = (console, [ a ]);
        for (var k in c)
            c, console.log(b++);
    }
    f(f);
}());
