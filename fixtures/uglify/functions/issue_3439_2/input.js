console.log(typeof function() {
    return function(a) {
        function a() {}
        return a;
    }(42);
}());
