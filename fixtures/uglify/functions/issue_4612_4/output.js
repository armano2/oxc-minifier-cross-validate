console.log(function() {
    function f() {
        h();
    }
    function g() {
        return h();
    }
    function h() {
        return g();
    }
}());
