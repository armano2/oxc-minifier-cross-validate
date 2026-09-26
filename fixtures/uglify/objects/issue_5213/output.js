var a = "FAIL";
console.log({
    p: (a = "PASS", null),
    0: a,
}[0]);
