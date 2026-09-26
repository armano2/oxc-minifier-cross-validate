var a = function f(b) {
    return [ b ] = [], b;
}("FAIL");
console.log(a || "PASS");
