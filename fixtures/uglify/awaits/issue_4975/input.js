(async function f(a) {
    try {
        if (a) console.log(typeof f());
    } catch (e) {}
})(42);
