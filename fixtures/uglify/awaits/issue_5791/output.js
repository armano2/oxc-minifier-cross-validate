(async function() {
    await async function() {
        try {
            await async function() {
                try {
                    await {
                        then(resolve) {
                            setImmediate(() => {
                                console.log("foo");
                                resolve();
                            });
                        },
                    };
                } catch (e) {
                    console.log("FAIL", e);
                }
            }();
        } catch (e) {}
    }();
    console.log("bar");
})();
