function f(a) {
    return a[a = "A"] + (a += "SS");
}
// IE9-11: undefinedASS
console.log(f({ A: "P" }));
