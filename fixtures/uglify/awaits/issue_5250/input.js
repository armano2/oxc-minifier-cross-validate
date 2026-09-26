(async function() {
    await function() {
        while (console.log("foo"));
    }();
    console.log("bar");
})();
console.log("baz");
