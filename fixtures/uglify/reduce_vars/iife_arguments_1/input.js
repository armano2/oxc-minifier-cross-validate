(function(x) {
    console.log(x() === arguments[0]);
})(function f() {
    return f;
});
