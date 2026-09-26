function f() {
    (function() {
        while (console.log(0/0));
    })();
    (function() {
        var NaN = console && console.log(NaN);
    })();
}
f();
