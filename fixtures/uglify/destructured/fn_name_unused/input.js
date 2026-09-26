console.log(function f({
    [typeof f]: a,
}) {
    var f;
    return a;
}({
    function: "PASS",
    undefined: "FAIL",
}));
