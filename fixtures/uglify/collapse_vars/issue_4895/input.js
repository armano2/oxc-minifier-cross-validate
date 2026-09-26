var a, b;
(function f() {
    a = 42;
})();
console.log((b = a) || b, b += 0);
