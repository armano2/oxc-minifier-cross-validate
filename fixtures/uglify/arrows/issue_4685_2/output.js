new function(f) {
    if (f() !== this)
        console.log("PASS");
}(() => {
    if (console)
        return this;
});
