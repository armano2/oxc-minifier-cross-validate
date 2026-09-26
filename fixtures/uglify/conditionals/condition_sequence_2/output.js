function f(x, y) {
    return console.log(y), y && x;
}
console.log(f("foo", "bar")),
console.log(f(null, "baz")),
console.log(f(42)),
console.log(f());
