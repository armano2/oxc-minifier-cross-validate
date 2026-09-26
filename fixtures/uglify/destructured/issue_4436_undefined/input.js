console.log(function({
    [delete undefined]: a,
}) {
    var undefined;
    return a;
}({
    true: "FAIL",
    false: "PASS",
}));
