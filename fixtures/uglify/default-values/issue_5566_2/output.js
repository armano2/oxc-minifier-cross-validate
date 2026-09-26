(function(a, f = function() {
    return a;
}) {
    function a() {}
    console.log(typeof a, typeof f());
})(42);
