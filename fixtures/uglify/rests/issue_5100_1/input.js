var a;
[ {
    p: {},
    ...a
} ] = [ {
    p: {
        q: a,
    } = 42,
    r: "PASS",
} ];
console.log(a.r);
