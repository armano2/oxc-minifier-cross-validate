for (var a in "foo") {
    (function() {
        var f;
        function f() {}
        console.log(typeof f, a - f);
    })();
}
