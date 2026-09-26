console.log(function f(a) {
    return f.length;
}(), function g(b) {
    return g;
}().length);
function h(c) {
    return h.length;
}
function i(d) {
    return i;
}
function j(e) {}
console.log(h(), i().length, j.length);
