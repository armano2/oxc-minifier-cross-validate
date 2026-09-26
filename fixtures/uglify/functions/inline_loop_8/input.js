for (var a in "foo") {
    (function() {
        var f;
        function f() {}
        while (console.log(typeof f, a - f));
    })();
}
