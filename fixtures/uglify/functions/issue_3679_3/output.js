(function() {
    function f() {};
    f.p = "PASS";
    (f.g = function() {
        console.log(f.p);
    })();
})();
