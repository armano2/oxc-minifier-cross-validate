var a = this;
(class A {
    static p = console.log(a === A ? "FAIL" : "PASS");
});
