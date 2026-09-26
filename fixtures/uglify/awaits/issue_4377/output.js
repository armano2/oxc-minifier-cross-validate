console.log(typeof function() {
    return f();
    async function f() {}
}().then);
