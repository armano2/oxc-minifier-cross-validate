console.log(function(f) {
    f();
}(function() {
    var a = function() {
        A;
    };
    var b = function() {
        a(B);
    };
    (function() {
        b;
    });
    var c = 42;
}));
