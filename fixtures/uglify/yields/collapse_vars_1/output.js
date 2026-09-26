var a = "FAIL";
(function*() {
    a = "PASS";
    yield 42;
    return "PASS";
})().next();
console.log(a);
