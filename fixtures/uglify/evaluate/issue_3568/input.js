var a = 0;
function f(b) {
    return b && b.p;
}
console.log(f(++a + f()));
