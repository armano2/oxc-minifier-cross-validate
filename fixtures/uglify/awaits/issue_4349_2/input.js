console.log(typeof async function() {
    (function(a) {
        this[a];
    }(await 0));
}().then);
