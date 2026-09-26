var N = 1;
(function(o, {
    pname: p,
} = o, {
    [p + N]: v,
} = o) {
    let N;
    console.log(v);
})({
    pname: "x",
    x1: "PASS",
});
