var a = 0;
1 && --a,
b = function f() {
    const c = a && f;
    c.var += 0;
}(),
void console.log(b);
var b;
