var a = "FAIL";
async function* f(b) {
    try {
        if (b)
            return;
        return void 0;
    } finally {
        a = "PASS";
    }
}
f(42).next();
console.log(a);
