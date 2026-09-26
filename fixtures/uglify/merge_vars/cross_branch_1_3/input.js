var a;
function f() {
    var x, y;
    if (a) {
        x = "foo";
        console.log(x);
        y = "bar";
    }
    console.log(y);
}
a = 0;
f();
a = 1;
f();
