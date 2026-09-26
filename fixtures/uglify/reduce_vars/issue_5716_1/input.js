var a;
function f() {
    var b = [ c, c ], c = function() {
        return b++ + (a = b);
    }();
}
f();
console.log(a);
