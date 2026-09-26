console.log(function() {
    var x = {
        a: 1,
        c: (console.log("c"), "C"),
        b: 2,
        3: function() {
            console.log(x);
        },
        a: /foo/,
    };
    x.bar = x;
    return x;
}());
