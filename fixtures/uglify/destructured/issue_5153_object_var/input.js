var a = {
    get p() {
        return b;
    },
}, {
    p: b
} = b = a;
console.log(a === b ? "PASS" : "FAIL");
