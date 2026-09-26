console.log(typeof function f() {
    return (() => f)();
}());
