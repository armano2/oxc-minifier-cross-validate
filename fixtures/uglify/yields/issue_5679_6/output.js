var a = "PASS";
async function* f(b) {
    try {
        if (!b)
            return console;
    } finally {
        a = "FAIL";
    }
}
f().next();
console.log(a);
