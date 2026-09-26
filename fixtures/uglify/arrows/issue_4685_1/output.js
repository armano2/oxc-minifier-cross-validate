new function(f) {
    if (f() !== this)
        console.log("PASS");
}(() => this);
