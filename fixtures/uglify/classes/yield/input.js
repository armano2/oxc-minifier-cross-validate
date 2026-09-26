var a = function*() {
    yield new class { [yield "foo"] = "bar" };
}();
console.log(a.next().value);
console.log(a.next(42).value[42]);
