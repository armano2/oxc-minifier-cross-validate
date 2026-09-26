function a() {
    try {
        A;
    } catch (e) {}
}
var b = a += a;
console.log(typeof b);
