function f(a) {
    var o = {};
    if (a)
        o.p = console.log("foo");
    else
        o.q = console.log("bar");
    o.r = console.log("baz");
}
f(42);
f(null);
