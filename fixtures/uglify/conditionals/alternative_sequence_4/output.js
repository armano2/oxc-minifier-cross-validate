function f(x, y, a, b) {
    return !x && (console.log("seq"), y) ? a : b;
}
console.log(f(false, false, 1, -1));
console.log(f(false, true, 2, -2));
console.log(f(true, false, 3, -3));
console.log(f(true, true, 4, -4));
