function f(a) {
    return a;
}
function g() {
    var o = {};
    var b = new f(o);
    if (console)
        b.p = "PASS";
    return o;
}
console.log(g().p);
