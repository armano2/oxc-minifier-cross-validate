var a, b;
function f() {
    var x, y;
    x = "foo";
    if (a) {
        console.log(x);
        y = "bar";
    }
    if (b)
        console.log(y);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();
