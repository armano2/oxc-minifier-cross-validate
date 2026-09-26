var alert = console.log;
function f(a, b) {
    return a ? "foo" : b ? "bar" : "baz";
}
alert(f());
alert(f(42));
alert(f(null, true));
alert(f([], {}));
