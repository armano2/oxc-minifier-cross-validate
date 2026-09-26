(function(o) {
    function f() {
        f = console.log;
        if (o.p++)
            throw "FAIL";
        f("PASS");
    }
    return f;
})({ p: 0 })();
