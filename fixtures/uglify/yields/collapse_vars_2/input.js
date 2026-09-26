var a = "FAIL";
(function*() {
    yield (a = "PASS");
    return "PASS";
})().next();
console.log(a);
