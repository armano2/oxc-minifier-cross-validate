var n = {
    f: function() {
        console.log("foo");
        return this.p;
    },
    p: "FAIL 1",
};
var o = {
    f: function() {
        console.log("foz");
        return this.p;
    },
    p: "FAIL 2",
};
var p = "PASS";
function g(a) {
    return (0, (a
        ? (console.log("baa"), console.log("bar"), console.log("baz"), n)
        : (console.log("moo"), console.log("mor"), console.log("moz"), o)).f)();
}
console.log(g());
console.log(g(42));
