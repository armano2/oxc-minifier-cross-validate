var x, y;
// 1
if (x && !(x + "1") && y) {
    var qq;
    foo();
} else {
    bar();
}
// 2
if (x || !!(x + "1") || y) {
    foo();
} else {
    var jj;
    bar();
}
