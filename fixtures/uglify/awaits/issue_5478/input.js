A = {
    get then() {
        a = "FAIL";
    },
};
var a = "PASS";
(async function() {
    for (var b in "foo")
        return void A;
})();
console.log(a);
