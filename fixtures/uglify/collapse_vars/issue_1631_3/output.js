function g() {
    function f() {
        return a = 2, 4;
    }
    var a = 0, t = f();
    return a + t;
}
console.log(g());
