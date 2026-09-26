console.log(function() {
    var a = 42;
    (function a() {});
    return typeof a;
}());
