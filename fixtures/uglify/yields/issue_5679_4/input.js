var a = "PASS";
async function* f(b) {
    try {
        if (b)
            return undefined;
        else
            return undefined;
    } finally {
        a = "FAIL";
    }
}
f(null).next();
console.log(a);
