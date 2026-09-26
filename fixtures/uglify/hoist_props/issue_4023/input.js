function f() {
    var a = function() {
        return { p: 0 };
    }();
    return console.log("undefined" != typeof a);
}
f();
