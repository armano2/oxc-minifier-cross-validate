var a = "FAIL";
async function* f(b) {
    try {
        if (b)
            return void 0;
        return;
    } finally {
        a = "PASS";
    }
}
f().next();
console.log(a);
