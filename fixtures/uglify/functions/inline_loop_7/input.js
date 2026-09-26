for (var a in "foo") {
    (function() {
        function f() {}
        var f;
        while (console.log(typeof f, a - f));
    })();
}
