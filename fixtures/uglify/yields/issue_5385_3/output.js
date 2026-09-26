(async function*() {
    try {
        throw console.log("foo");
    } catch (e) {
        return console.log("bar");
    }
    return void 0;
})().next();
console.log("moo");
