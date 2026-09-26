console.log(function({
    [delete NaN]: a,
}) {
    var NaN;
    return a;
}({
    true: "FAIL",
    false: "PASS",
}));
