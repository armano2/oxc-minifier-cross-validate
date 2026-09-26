var a = function*() {
    yield* function*() {
        for (var a of [ "foo", "bar" ])
            yield a;
        return "FAIL";
    }();
}(), b;
do {
    b = a.next();
    console.log(b.value);
} while (!b.done);
