var a;
function f() {
    var x, x;
    x = "foo";
    if (a)
        console.log(x);
    x = "bar";
    console.log(x);
}
a = 0;
f();
a = 1;
f();
