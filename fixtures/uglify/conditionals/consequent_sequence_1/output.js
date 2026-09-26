function f(x, y, a) {
    return (!x || (console.log("seq"), y)) && a;
}
console.log(f(false, false, 1));
console.log(f(false, true, 2));
console.log(f(true, false, 3));
console.log(f(true, true, 4));
