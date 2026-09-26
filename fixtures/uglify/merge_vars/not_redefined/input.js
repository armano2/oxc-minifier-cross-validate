var log = console.log;
(function() {
    return f("PASS");
    function f(a) {
        const b = a;
        const c = log(b);
        const d = log;
        c && log(d);
    }
})();
