(function() {
    var a;
    function f() {
        console.log("PASS");
    }
    f(a = 1 + a);
})();
