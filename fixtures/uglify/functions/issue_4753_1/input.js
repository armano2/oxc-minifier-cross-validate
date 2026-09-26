for (var i in [ 1, 2 ])
    (function() {
        function f() {}
        f && console.log(f.p ^= 42);
    })();
