function f() {
    var o = {};
    var unused = {}; // Doesn't get removed because upper scope uses with
    function foo() {
        with(o) {
            var foo = "something"
        }
        doSomething(o);
    }
    foo()
}
