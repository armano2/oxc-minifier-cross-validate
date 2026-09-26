function f(a) {
    var b;
    return b = a || g;
    function g() {
        return b;
    }
}
console.log(typeof f()());
