var a = function() {
    return this;
}();
function b() {
    console.log("foo");
}
b.c = function() {
    console.log(this === b ? "bar" : "baz");
},
b(),
b.c(),
(0, b.c)(),
b["c"](),
(0, b["c"])(),
function() {
    console.log(this === a);
}(),
new b(),
new b.c(),
new b.c(),
new b["c"](),
new b["c"](),
new function() {
    console.log(this === a);
}(),
console.log(typeof b.c),
console.log(typeof b["c"]);
