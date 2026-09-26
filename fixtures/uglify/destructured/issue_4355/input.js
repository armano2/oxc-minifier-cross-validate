var a;
(function({
    [function() {
        for (a in "foo");
    }()]: b,
}) {
    var a;
})(0);
console.log(a);
