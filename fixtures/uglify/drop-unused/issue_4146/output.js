(function(a, b) {
    a = function () {};
    var c = b;
    c.p;
    console.log(typeof a);
})(0, 42);
