console.log(function() {
    var arguments;
    return typeof arguments;
}(), "number", function(x) {
    var arguments = x;
    return typeof arguments;
}());
