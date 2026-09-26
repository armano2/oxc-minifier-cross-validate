(class A {
    static p = function() {
        console.log(this === A ? "FAIL" : "PASS");
    }();
});
