var a = function f(b) {
    return function g() {
        for (b in { PASS: 42 });
    }(), b;
}("FAIL");
console.log(a);
