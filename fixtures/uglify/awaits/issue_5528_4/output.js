(async function() {
    await function() {
        try {
            return {
                then() {
                    console.log("foo");
                },
            };
        } finally {
            console.log("bar");
        }
    }();
})();
console.log("baz");
