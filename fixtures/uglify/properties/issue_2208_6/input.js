a = 42;
console.log(("FAIL", {
    p: function() {
        return this.a;
    }
}.p)());
