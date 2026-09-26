var a;
({
    p: {},
    ...a
} = [ {
    p: {
        q: a,
    } = 42,
    r: "PASS",
} ][0]);
console.log(a.r);
