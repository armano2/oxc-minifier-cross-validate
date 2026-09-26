console.log("foo");
var a = async function*() {
    console.log(await(yield* async function*() {
        yield {
            then: r => r("bar"),
        };
        return "baz";
    }()));
}();
console.log("moo");
a.next().then(function f(b) {
    console.log(b.value);
    b.done || a.next().then(f);
});
console.log("moz");
