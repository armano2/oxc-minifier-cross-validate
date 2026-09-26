var a, b = function f({
    p: {},
    ...c
}) {
    while (c.q);
}({
    p: {
        r: a++,
        r: 0,
    }
});
console.log(a);
