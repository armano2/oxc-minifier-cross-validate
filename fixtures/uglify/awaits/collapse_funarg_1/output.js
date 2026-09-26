A = "FAIL";
var a = "PASS";
(async function({}, b) {
    return b;
})(null, A = a);
console.log(A);
