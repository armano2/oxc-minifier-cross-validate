var a = {
    get p() {
        return b;
    },
}, b;
({
    p: b
} = b = a);
console.log(a === b ? "PASS" : "FAIL");
