(function(a) {
    function f() {
        return 42;
        console.log("FAIL");
    }
    f();
    (a = console).log(typeof f);
})();
