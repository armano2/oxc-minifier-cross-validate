(async function() {
    await function() {
        try {
            FAIL;
        } catch (e) {
            return console.log("foo");
        } finally {
            console.log("bar");
        }
    }();
})();
console.log("baz");
