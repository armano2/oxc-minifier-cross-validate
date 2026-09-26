function f(a) {
    var t;
    if (a) {
        t = "foo";
        t = "bar";
    } else {
        console.log(t);
        t = 42;
    }
    console.log(t);
}
f(f);
f();
