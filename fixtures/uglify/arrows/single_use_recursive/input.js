function f() {
    return (() => f)();
}
console.log(typeof f());
