function problem(w) {
    return g.indexOf(w);
}
function unused(x) {
    return problem(x);
}
function B(problem) {
    return g[problem];
}
function A(y) {
    return problem(y);
}
function main(z) {
    return B(A(z));
}
var g = [ "PASS" ];
console.log(main("PASS"));
