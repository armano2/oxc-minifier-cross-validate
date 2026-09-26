function a() {
    try {
        A;
    } catch (a) {}
}
var b = a += a;
console.log(typeof b);
