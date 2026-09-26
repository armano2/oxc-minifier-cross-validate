(class A {
    static p = function() {
        var a = this;
        console.log(a === A ? "FAIL" : "PASS");
    }();
});
