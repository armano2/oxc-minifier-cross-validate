var a = function*() {
    yield b;
}(), b;
[ b ] = b = a;
console.log(a === b ? "PASS" : "FAIL");
