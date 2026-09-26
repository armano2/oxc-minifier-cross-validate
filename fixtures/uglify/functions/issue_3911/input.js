function f() {
    return function() {
        if (a) (a++, b += a);
        f();
    };
}
var a = f, b;
console.log("PASS");
