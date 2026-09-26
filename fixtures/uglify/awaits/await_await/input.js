(async function() {
    await await {
        then(resolve) {
            resolve({
                then() {
                    console.log("PASS");
                },
            });
        },
    };
})();
