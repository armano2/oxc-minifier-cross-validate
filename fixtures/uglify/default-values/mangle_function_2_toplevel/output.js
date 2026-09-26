var a = 1;
(function({
    pname: n = "x",
    i: o = a,
}, {
    [n + o]: e,
}) {
    let l;
    console.log(e);
})({}, {
    x1: "PASS",
});
