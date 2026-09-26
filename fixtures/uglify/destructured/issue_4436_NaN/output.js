console.log(function({
    [delete NaN]: a,
}) {
    return a;
}({
    true: "FAIL",
    false: "PASS",
}));
