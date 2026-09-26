var a;
function f() {
    var x, y;
    x = "foo";
    console.log(x);
    if (a)
        y = "bar";
    console.log(y);
}
a = 0;
f();
a = 1;
f();
