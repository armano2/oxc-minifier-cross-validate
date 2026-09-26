var a, b;
function f() {
    var x, x;
    x = "foo";
    console.log(x);
    if (a) {
        x = "bar";
        if (b)
            console.log(x);
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
