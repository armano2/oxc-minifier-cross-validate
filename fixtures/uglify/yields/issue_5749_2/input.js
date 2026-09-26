var a;
function* f() {}
a = f(new function() {
    var b = a |= 0, c = a += console.log("PASS");
}());
