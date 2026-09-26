var a = "foo";
(async function() {
    await async function() {
        try {
            return {
                then(resolve) {
                    console.log("bar");
                    resolve();
                    console.log("baz");
                },
            };
        } finally {
            a = "moo";
        }
    }();
})();
console.log(a);
