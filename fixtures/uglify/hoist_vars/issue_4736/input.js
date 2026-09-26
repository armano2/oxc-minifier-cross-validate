var a;
function f() {
    (function g() {
        var b = (a = 0, 1 << 30);
        var c = (a = 0, console.log(b));
        var d = c;
    })(f);
}
f();
