var a = function*() {
    yield "foo",
    "FAIL";
}(), b;
do {
    b = a.next(),
    console.log(b.value);
} while (!b.done);
