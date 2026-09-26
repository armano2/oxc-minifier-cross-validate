function f(a) {
    for (var r in a) (function(a) {
        console.log(a);
    })(r);
}
(function(a) {
    var g = a.bar;
    g();
    g();
    (function(b) {
        f(b);
    })(a);
})({
    bar: function() {
        console.log("foo");
    }
});
