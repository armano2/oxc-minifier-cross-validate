console.log(typeof function(await) {
    return async function(a) {
        this[a];
    }(await);
}(this).then);
