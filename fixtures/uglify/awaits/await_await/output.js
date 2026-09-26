(async function() {
    await {
        then(resolve) {
            resolve({
                then() {
                    console.log("PASS");
                },
            });
        },
    };
})();
