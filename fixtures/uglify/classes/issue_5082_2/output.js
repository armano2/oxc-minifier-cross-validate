(function() {
    class A {
        p = console.log("PASS");
        q() {}
    }
    (class {
        static c = new A();
    });
})();
