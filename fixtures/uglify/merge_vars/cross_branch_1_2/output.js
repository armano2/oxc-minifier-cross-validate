var a;
function f() {
    var x, x;
    if (a) {
        x = "foo";
        console.log(x);
    }
    x = "bar";
    console.log(x);
}
a = 0;
f();
a = 1;
f();
