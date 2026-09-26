console.log(function({
    [delete undefined]: a,
}) {
    return a;
}({
    true: "FAIL",
    false: "PASS",
}));
