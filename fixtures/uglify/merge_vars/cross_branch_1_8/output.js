var a;
function f() {
    var x, x;
    x = "foo";
    console.log(x);
    if (a) {
        x = "bar";
        console.log(x);
    }
}
a = 0;
f();
a = 1;
f();
