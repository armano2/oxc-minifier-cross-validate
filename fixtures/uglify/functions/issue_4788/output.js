(function f() {
    function a() {
        if (0) {
            var g = 42;
            f();
        }
        g || console.log("PASS");
    }
    a();
})();
