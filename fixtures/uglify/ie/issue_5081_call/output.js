function f(a) {
    // IE5-10: TypeError: Function expected
    return a(a = "A") + (a += "SS");
}
console.log(f(function() {
    return "P";
}));
