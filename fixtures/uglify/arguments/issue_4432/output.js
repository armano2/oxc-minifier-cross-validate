console.log(function(a) {
    for (a in { FAIL: 42 });
    return arguments[0];
}() || "PASS");
