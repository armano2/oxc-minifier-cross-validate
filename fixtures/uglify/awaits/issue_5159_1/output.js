(async function() {
    try {
        throw "foo";
    } catch (e) {
        return await "bar";
    } finally {
        console.log("baz");
    }
})().catch(console.log).then(console.log);
console.log("moo");
