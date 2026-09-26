var a;
function f() {
    var x, y;
    x = "foo";
    if (a) {
        console.log(x);
        y = "bar";
    }
    console.log(y);
}
a = 0;
f();
a = 1;
f();
