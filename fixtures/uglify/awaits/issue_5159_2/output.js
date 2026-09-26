(async function() {
    try {
        throw "foo";
    } catch (e) {
        return "bar";
    }
})().catch(console.log).then(console.log);
console.log("baz");
