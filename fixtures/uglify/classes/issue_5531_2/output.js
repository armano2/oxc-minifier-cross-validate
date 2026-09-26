class A {
    static p = (a = function f() {
        if (!a)
            console.log("foo");
        return 42;
    }(a++), void 0);
}
var a;
new A();
new A();
