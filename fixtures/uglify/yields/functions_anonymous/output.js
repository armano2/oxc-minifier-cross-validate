function* yield() {
    return "PASS";
}
console.log(yield().next(yield).value);
