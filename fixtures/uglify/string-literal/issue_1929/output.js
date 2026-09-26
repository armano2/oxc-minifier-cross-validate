function f(s) {
    return s.split(/[\\/]/);
}
console.log(JSON.stringify(f("A/B\\C\\D/E\\F")));
