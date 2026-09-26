function f(a) {
    var t;
    if (a) {
        t = "foo";
        a = "bar";
    } else {
        console.log(t);
        t = 42;
    }
    console.log(t);
}
f(f);
f();
