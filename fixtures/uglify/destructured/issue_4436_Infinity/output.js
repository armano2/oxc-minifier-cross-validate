console.log(function({
    [delete Infinity]: a,
}) {
    return a;
}({
    true: "FAIL",
    false: "PASS",
}));
