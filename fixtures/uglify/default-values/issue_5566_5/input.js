(function(a, f = function() {
    return a;
}) {
    var a = "foo";
    var b;
    console.log(a, f());
})("bar");
