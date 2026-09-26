(function() {
    function f() {
        var a;
        var b = function a() {
            console.log(a === b) && f();
        };
        b();
    }
    f();
})();
