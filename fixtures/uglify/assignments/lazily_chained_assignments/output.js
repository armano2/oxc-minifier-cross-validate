function f(a) {
    return console.log("foo") && console.log("bar");
}
function g(b) {
    return console.log("baz") || console.log("moo");
}
console.log(f(), g());
