var a = "FAIL";
async function* f(b) {
    try {
        b;
        return;
    } finally {
        a = "PASS";
    }
}
f().next();
console.log(a);
