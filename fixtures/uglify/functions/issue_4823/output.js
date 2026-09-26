console.log(typeof function() {
    {
        function f() {}
        f();
        var arguments = function() {};
    }
    return f && arguments;
}());
