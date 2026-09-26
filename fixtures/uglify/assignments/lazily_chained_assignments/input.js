function f(a) {
    if (a = console.log("foo"))
        a = console.log("bar");
    return a;
}
function g(b) {
    if (b = console.log("baz"))
        ;
    else
        b = console.log("moo");
    return b;
}
console.log(f(), g());
