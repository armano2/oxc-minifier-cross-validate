var g = [ "PASS" ];
function problem(arg) {
    return g.indexOf(arg);
}
console.log((arg = "PASS", function(problem) {
    return g[problem];
}(problem(arg))));
var arg;
