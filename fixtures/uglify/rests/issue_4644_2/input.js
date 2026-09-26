console.log(function(...a) {
    return a[1];
}("FAIL", "PASS"), function(...b) {
    return b.length;
}(), function(c, ...d) {
    return d[0];
}("FAIL"));
