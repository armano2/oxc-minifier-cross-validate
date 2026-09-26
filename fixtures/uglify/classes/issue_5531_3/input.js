class A {
    static {
        (function() {
            var a = function f() {
                if (!a)
                    console.log("foo");
                return 42;
            }(a++);
        })();
    }
}
new A();
new A();
