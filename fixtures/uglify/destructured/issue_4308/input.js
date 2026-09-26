var a = "PASS";
console.log(function({
    [a = "FAIL"]: b
}, c) {
    return c;
}(0, a));
