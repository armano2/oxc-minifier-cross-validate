var N = 1;
(function({
    pname: p = "x",
    i: n = N,
}, {
    [p + n]: v,
}) {
    let N;
    console.log(v);
})({}, {
    x1: "PASS",
});
