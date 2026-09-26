var a = function() {
    return this;
}();
function b() {
    console.log("foo");
}
b.c = function() {
    console.log(this === b ? "bar" : "baz");
},
a,
b(),
a,
b.c(),
(a, b.c)(),
a,
b["c"](),
(a, b["c"])(),
a,
function() {
    console.log(this === a);
}(),
a,
new b(),
a,
new b.c(),
a,
new b.c(),
a,
new b["c"](),
a,
new b["c"](),
a,
new function() {
    console.log(this === a);
}(),
console.log((a, typeof b.c)),
console.log((a, typeof b["c"]));
