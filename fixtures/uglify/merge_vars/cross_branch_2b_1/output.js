var a, b;
function f() {
    var x, x;
    if (a)
        x = "foo";
    if (b)
        console.log(x);
    x = "bar";
    console.log(x);
}
a = 0, b = 0;
f();
a = 1, b = 0;
f();
a = 0, b = 1;
f();
a = 1, b = 1;
f();
