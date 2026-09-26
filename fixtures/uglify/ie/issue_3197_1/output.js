window.Foo = function o() {
    console.log(this instanceof o);
};
new window.Foo();
