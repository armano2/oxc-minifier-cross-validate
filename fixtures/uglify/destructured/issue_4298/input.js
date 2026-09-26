(function() {
    var a = {
        object: "PASS",
    };
    function f({
        [typeof a]: b,
    }) {
        var a = b;
        return a;
    }
    var c = f(a);
    console.log(c);
})();
