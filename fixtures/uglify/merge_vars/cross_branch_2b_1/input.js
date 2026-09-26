var a, b;
function f() {
    var x, y;
    if (a)
        x = "foo";
    if (b)
        console.log(x);
    y = "bar";
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
