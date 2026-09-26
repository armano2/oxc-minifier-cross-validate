console.log(typeof function() {
    return function() {
        f;
        async function f() {}
        return f();
    }();
}().then);
