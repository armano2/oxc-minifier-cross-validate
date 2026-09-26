(async function f() {
    return (f.g = () => 42)();
})().then(console.log);
