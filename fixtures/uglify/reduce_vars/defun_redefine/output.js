function f() {
    (function() {
        return 3;
    });
    return 5;
}
console.log(f());
