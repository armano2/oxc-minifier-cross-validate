(function() {
    async function f() {
        var a = function() {
            await;
        }();
        return "FAIL";
    }
    return f();
})().then(console.log).catch(function() {
    console.log("PASS");
});
