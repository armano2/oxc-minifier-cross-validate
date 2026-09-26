A = "FAIL";
B = "PASS";
try {
    console.log(function({}, a) {
        return a;
    }(null, A = B));
} catch (e) {}
console.log(A);
