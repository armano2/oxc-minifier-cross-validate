console.log(typeof function() {
    var await = function f() {
        return f;
    };
    return await() === await;
}() ? "PASS" : "FAIL");
