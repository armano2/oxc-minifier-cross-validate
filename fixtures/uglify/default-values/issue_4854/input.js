console.log(function(a) {
    (function(b = a = "foo") {
        [] = "foo";
    })();
    a;
}());
