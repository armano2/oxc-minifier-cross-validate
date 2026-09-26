function f(a) {
    for (var r in a) g(r);
}
function g(a) {
    console.log(a);
}
function h(a) {
    var g = a.bar;
    g();
    g();
    i(a);
}
function i(b) {
    f(b);
}
h({
    bar: function() {
        console.log("foo");
    }
});
