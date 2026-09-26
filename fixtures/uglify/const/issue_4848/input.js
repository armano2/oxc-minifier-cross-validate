function f(a) {
    a(function() {
        console.log(b);
    });
    if (!console)
        return;
    const b = "PASS";
}
var g;
f(function(h) {
    g = h;
});
g();
