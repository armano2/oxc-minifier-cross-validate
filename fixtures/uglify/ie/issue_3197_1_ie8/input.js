!function() {
    function Foo() {
        console.log(this instanceof Foo);
    }
    window.Foo = Foo;
}();
new window.Foo();
