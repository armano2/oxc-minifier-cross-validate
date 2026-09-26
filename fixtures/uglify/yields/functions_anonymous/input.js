var yield = function*() {
    return "PASS";
};
console.log(yield().next(yield).value);
