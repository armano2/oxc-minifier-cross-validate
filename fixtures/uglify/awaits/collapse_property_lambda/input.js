(async function f() {
    f.g = () => 42;
    return f.g();
})().then(console.log);
