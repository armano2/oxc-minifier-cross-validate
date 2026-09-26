A = {
    get then() {
        a = "FAIL";
    },
};
var a = "PASS";
(async function() {
    for (var b in "foo")
        return !A;
})();
console.log(a);
