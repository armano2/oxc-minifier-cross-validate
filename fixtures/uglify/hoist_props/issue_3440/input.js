(function() {
    function f() {
        console.log(o.p);
    }
    var o = {
        p: "PASS",
    };
    return f;
})()();
