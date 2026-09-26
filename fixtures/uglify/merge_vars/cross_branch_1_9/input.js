var a;
function f() {
    var x, y;
    x = "foo";
    console.log(x);
    y = "bar";
    if (a)
        console.log(y);
}
a = 0;
f();
a = 1;
f();
