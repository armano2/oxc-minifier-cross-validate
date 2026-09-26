var a = "PASS";
async function* f(b) {
    try {
        return b, void 0;
    } finally {
        a = "FAIL";
    }
}
f(null).next();
console.log(a);
