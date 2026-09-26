new function() {
    console.log(function(f) {
        return f() === this;
    }(() => {
        if (console)
            return this;
    }) || "PASS");
}
