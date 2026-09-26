function f(a) {
    var b;
    return a(b = "A") + (b += "SS");
}
console.log(f(function() {
    return "P";
}));
