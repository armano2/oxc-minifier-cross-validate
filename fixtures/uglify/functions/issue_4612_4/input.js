console.log(function() {
    function f() {
        return h();
    }
    function g() {
        {
            return h();
        }
    }
    function h() {
        {
            return g();
        }
    }
}());
