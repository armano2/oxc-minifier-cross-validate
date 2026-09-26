var a = 42;
(function() {
    f();
    f();
    function f() {
        if (console && a)
            for (;console.log("foo"););
    }
})();
