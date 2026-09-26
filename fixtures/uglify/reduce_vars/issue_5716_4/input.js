var a;
function f() {
    var b = [ c, c ], c = function() {
        return (b = true | b) + (a = b *= 42);
    }();
}
f();
console.log(a);
