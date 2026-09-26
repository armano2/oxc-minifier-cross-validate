var a, b;
function f() {
    var x, x;
    if (a) {
        x = "foo";
        console.log(x);
        x = "bar";
    }
    if (b)
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
