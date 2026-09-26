var a = "FAIL";
var b = function*(c) {
    return c;
}(a = "PASS");
console.log(a, b.next().done);
