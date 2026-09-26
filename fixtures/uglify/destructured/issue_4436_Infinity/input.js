console.log(function({
    [delete Infinity]: a,
}) {
    var Infinity;
    return a;
}({
    true: "FAIL",
    false: "PASS",
}));
