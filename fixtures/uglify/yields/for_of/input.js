function* f() {
    if (yield "PASS") yield "FAIL 1";
    yield 42;
    return "FAIL 2";
}
for (var a of f())
    console.log(a);
