function f() {
    while (console.log(NaN));
    (function() {
        var NaN = console && console.log(NaN);
    })();
}
f();
