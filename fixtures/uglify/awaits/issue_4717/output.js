(async function() {
    return function() {
        await;
    }(), "FAIL";
})().then(console.log).catch(function() {
    console.log("PASS");
});
