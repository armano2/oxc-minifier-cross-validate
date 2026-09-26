var a = function*() {
    yield* function*() {
        yield "foo";
        return "FAIL";
    }();
}(), b;
do {
    b = a.next();
    console.log(b.value);
} while (!b.done);
