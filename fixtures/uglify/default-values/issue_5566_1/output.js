(function(a, f = function() {
    return a;
}) {
    var a = "foo";
    console.log(a, f());
})("bar");
