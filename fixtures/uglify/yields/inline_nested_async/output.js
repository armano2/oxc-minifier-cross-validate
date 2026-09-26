console.log("foo");
var a = async function*() {
    console.log((yield {
        then: r => r("bar"),
    }, await "baz"));
}();
console.log("moo"),
a.next().then(function f(b) {
    console.log(b.value),
    b.done || a.next().then(f);
}),
console.log("moz");
