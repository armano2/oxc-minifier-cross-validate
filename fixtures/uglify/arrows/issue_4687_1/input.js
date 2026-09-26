new function() {
    console.log(function(f) {
        return f() === this;
    }(() => this) || "PASS");
}
