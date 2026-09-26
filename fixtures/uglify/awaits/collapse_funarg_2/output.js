A = "FAIL";
B = "PASS";
(async function() {
    console.log(function({}, a) {
        return a;
    }(null, A = B));
})();
console.log(A);
