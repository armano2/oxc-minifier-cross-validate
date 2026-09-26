var a;
function f() {
    var b = [ c, c ], c = function() {
        return (b += 4) + (a = b += 2);
    }();
}
f();
console.log(a);
