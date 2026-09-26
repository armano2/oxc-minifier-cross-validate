function f(a) {
    class A {
        p = a;
    }
    var b = "FAIL";
    A == b && b();
    return new A();
}
console.log(f("PASS").p);
