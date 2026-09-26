class A {
    static p = this.q;
    f() {}
}
if (A)
    console.log("PASS");
