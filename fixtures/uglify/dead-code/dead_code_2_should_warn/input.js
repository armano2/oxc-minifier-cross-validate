function f() {
    g();
    x = 10;
    throw new Error("foo");
    // completely discarding the `if` would introduce some
    // bugs.  UglifyJS v1 doesn't deal with this issue; in v2
    // we copy any declarations to the upper scope.
    if (x) {
        y();
        var x;
        function g(){};
        // but nested declarations should not be kept.
        (function(){
            var q;
            function y(){};
        })();
    }
}
f();
