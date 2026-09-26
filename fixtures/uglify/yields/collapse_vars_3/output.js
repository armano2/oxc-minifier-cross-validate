var a = "FAIL";
(function*() {
    yield (a = "PASS", 42);
    return "PASS";
})().next();
console.log(a);
