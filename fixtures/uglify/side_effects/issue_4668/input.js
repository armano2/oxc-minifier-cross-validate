function f(a) {
    var b, c;
    function g() {
        return a = 0 + a, !d || (a = 0);
    }
    c = g();
}
console.log(f());
var d = 0;
