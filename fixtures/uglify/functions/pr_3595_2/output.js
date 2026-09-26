var g = [ "PASS" ];
function problem(arg) {
    return g.indexOf(arg);
}
console.log(function(problem) {
    return g[problem];
}(problem("PASS")));
