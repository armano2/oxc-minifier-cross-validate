(async function() {
    async function f() {
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
    }
    async function g() {
        try {
            await f();
        } catch (e) {}
    }
    await g();
    console.log("bar");
})();
