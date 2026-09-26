console.log(typeof function() {
    return g();
    function f() {
        return g;
    }
    function g() {
        {
            return f;
        }
    }
}());
