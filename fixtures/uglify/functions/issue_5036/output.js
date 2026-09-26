console.log(typeof function() {
    function await() {
        return await;
    }
    return await() === await;
}() ? "PASS" : "FAIL");
