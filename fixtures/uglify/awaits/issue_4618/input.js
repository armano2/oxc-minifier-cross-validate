console.log(typeof function() {
    var await = async function f() {
        console || f();
    };
    console.log;
    return await;
}());
