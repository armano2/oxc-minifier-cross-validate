var n, a = 0, b;
function f() {
    try {
        throw 0;
    } catch (b) {
        (function g() {
            (function b() {
                a++;
            })();
        })();
    }
}
f();
console.log(a);
