window.Foo = function Foo() {
    console.log(this instanceof Foo);
};
new window.Foo();
