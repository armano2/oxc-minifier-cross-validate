console.log(typeof function() {
    var a = 42;
    function a() {}
    return a;
}());
