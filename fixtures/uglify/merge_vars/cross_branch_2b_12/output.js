var a, b;
function f() {
    var x, x;
    x = "foo";
    if (a)
        console.log(x);
    if (b) {
        x = "bar";
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
