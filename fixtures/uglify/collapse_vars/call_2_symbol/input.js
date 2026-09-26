(function(a) {
    function f() {
        return 42;
        console.log("FAIL");
    }
    a = console;
    f();
    a.log(typeof f);
})();
