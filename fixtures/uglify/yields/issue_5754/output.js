async function* f(a, b) {
    try {
        if (a)
            return void 0;
    } finally {
        console.log(b);
    }
}
f(42, "foo").next();
f(null, "bar").next();
console.log("baz");
