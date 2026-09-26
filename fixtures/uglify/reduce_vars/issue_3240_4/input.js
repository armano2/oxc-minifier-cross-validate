(function() {
    f();
    function f(b) {
        if (!f.a) f.a = 0;
        console.log(f.a.toString());
        var g = function() {
            (b ? function() {} : function() {
                f.a++;
                f(1);
            })();
        };
        g();
    }
})();
