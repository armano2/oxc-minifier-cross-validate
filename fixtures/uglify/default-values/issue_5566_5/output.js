(function(a, f = function() {
    return a;
}) {
    var a, b;
    a = "foo";
    console.log(a, f());
})("bar");
