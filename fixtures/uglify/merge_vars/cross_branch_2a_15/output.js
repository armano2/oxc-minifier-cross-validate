var a, b;
function f() {
    var x, y;
    x = "foo";
    console.log(x);
    if (a) {
        if (b)
            y = "bar";
        console.log(y);
    }
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();
