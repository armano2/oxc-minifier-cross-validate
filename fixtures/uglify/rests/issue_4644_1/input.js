var a = "FAIL";
(function f(b, ...{
    [a = "PASS"]: c,
}) {
    return b;
})();
console.log(a);
