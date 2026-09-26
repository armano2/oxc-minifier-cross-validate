(async function() {
    await function() {
        try {
            return;
        } finally {
            console.log("foo");
        }
    }();
})();
console.log("bar");
