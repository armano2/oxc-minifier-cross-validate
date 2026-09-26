console.log(typeof function() {
    {
        function f() {}
        var arguments = f();
        function g() {}
        var arguments = g;
    }
    return f && arguments;
}());
