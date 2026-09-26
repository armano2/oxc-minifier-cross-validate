function outer() {
    var o = {};
    var unused = {};     // should be kept
    function foo() {     // should be kept
        function not_in_use() {
            return 24;
        }
        var unused = {}; // should be kept
        with (o)
            var foo = "something";
        doSomething(o);
    }
    function bar() {
        doSomethingElse();
    }
    foo();
    bar();
}
