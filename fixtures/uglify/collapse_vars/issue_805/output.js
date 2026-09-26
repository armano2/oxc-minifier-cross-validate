function f() {
    function Foo(){}
    (Foo.prototype = {}).bar = 42;
    return Foo;
}
