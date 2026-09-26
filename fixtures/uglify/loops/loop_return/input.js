function f(a) {
    while (a) return 42;
    return "foo";
}
console.log(f(0), f(1));
