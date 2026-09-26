function f(a) {
    if (1 == a) return "foo";
    if (2 == a) return "foo";
    if (3 == a) return "foo";
    if (4 == a) return 42;
    if (5 == a) return "foo";
    if (6 == a) return "foo";
    return "bar";
}
console.log(f(1), f(2), f(3), f(4), f(5), f(6), f(7));
