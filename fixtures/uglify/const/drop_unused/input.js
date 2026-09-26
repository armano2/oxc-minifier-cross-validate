function f(a) {
    const b = a, c = b;
    0 && c.p++;
}
console.log(f());
