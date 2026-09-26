(async function() {
    await function() {
        try {
            return 42;
        } finally {
            console.log("foo");
        }
    }();
})();
console.log("bar");
