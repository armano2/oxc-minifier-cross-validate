console.log(typeof function *() {
    // Syntax error on Node.js v6+
    return (yield) => {};
}().next().value);
