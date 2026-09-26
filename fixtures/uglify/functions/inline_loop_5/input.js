for (var a in "foo") {
    (function() {
        function f() {}
        var f;
        console.log(typeof f, a - f);
    })();
}
