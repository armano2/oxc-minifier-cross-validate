(function(a) {
    function f() {
        var o = { PASS: 42 };
        for (a in o);
    }
    (function() {
        if (f());
    })();
    console.log(a);
})();
