(async function*() {
    return async function() {
        try {
            return {
                then(resolve) {
                    resolve(console.log("FAIL"));
                },
            };
        } finally {
            return "PASS";
        }
    }();
})().next().then(o => console.log(o.value, o.done));
