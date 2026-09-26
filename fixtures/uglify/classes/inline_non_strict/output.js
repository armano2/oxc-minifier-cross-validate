function f(a) {
    return a.p = "PASS";
}
console.log(new class {
    g() {
        return f(42);
    }
}().g());
