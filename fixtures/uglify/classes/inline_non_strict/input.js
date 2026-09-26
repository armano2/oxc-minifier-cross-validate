function f(a) {
    return a.p = "PASS";
}
class A {
    g() {
        return f(42);
    }
}
console.log(new A().g());
