var a = function*() {
    for (var a of [ "foo", "bar" ])
        yield a;
    "FAIL";
}(), b;
do {
    b = a.next();
    console.log(b.value);
} while (!b.done);
