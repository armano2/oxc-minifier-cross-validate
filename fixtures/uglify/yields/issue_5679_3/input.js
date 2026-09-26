var a = "FAIL";
async function* f(b) {
    try {
        if (b)
            return;
        else
            return undefined;
    } finally {
        a = "PASS";
    }
}
f(42).next();
console.log(a);
