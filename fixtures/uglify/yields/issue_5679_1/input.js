var a = "FAIL";
async function* f(b) {
    try {
        if (b)
            return;
        else
            return;
    } finally {
        a = "PASS";
    }
}
f().next();
console.log(a);
