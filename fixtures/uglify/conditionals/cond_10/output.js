function f(a) {
    return 1 == a || 2 == a || 3 == a ? "foo" : 4 == a ? 42 : 5 == a || 6 == a ? "foo" : "bar";
}
console.log(f(1), f(2), f(3), f(4), f(5), f(6), f(7));
