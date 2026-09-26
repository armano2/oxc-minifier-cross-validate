function f1(b, c, d) {
    return a = c ? d : b, a;
}
function f2(a, c, d) {
    return a = b, c && (a = d), a;
}
function f3(a, b, d) {
    return a = b, c && (a = d), a;
}
function f4(a, b, c) {
    return a = b, c && (a = d), a;
}
