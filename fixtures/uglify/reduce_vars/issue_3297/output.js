(function() {
    (function f() {
        var b = function a() {
            console.log(a === b) && f();
        };
        b();
    })();
})();
