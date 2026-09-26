var a;
console.log("PASS");
var b = function*({
    p: {},
}) {}({
    p: { a } = 42,
});
