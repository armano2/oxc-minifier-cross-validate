console.log(function f() {
    (function() {
        for (f in "f");
    })();
    return f;
    var f;
}());
